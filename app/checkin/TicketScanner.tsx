// components/TicketScanner.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface TicketData {
  ticketId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  checkedIn: boolean;
  event: {
    eventDetails: {
      eventTitle: string;
    };
  };
}

export default function TicketScanner() {
  const [scanning, setScanning] = useState(true);
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [scannedData, setScannedData] = useState<{ txnId: string; ticketId: string } | null>(null);

  useEffect(() => {
    if (!scanning) return;

    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      },
      false
    );

    scannerRef.current = scanner;

    scanner.render(onScanSuccess, onScanFailure);

    function onScanSuccess(decodedText: string) {
      console.log('Scanned:', decodedText);
      
      try {
        const url = new URL(decodedText);
        const txnId = url.searchParams.get('txnId');
        const ticketId = url.searchParams.get('ticketId');

        if (txnId && ticketId) {
          setScanning(false);
          scanner.clear();
          setScannedData({ txnId, ticketId });
          verifyTicket(txnId, ticketId);
        } else {
          setError('Invalid ticket QR code format');
        }
      } catch (err) {
        setError('Invalid QR code. Please scan a valid AFROSPOOK ticket.');
      }
    }

    function onScanFailure(error: any) {
      // Ignore scan failures (normal when camera is searching)
    }

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [scanning]);

  const verifyTicket = async (txnId: string, ticketId: string) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        `http://localhost:5000/api/payment/check-in?txnId=${txnId}&ticketId=${ticketId}`
      );
      const data = await res.json();

      if (res.ok) {
        setTicket(data.ticket);
      } else {
        setError(data.message || 'Invalid ticket');
      }
    } catch (err) {
      setError('Failed to verify ticket. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (!scannedData) return;

    setCheckingIn(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/tickets/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          txnId: scannedData.txnId,
          ticketId: scannedData.ticketId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Update ticket state to show checked in
        setTicket(prev => prev ? { ...prev, checkedIn: true } : null);
        setTimeout(() => {
          resetScanner();
        }, 3000);
      } else {
        setError(data.message || 'Check-in failed');
      }
    } catch (err) {
      setError('Failed to check in. Please try again.');
    } finally {
      setCheckingIn(false);
    }
  };

  const resetScanner = () => {
    setScanning(true);
    setTicket(null);
    setError('');
    setScannedData(null);
  };

  return (
    <div className="min-h-screen bg- py-20 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Decave</h1>
          <p className="text-purple-200">Ticket Check-In Scanner</p>
        </div>

        {/* Scanner Card */}
        <div className="bg-white text-black rounded-2xl shadow-2xl overflow-hidden">
          {scanning && (
            <div className="p-6">
              <div className="mb-4 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-3">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Scan Ticket QR Code</h2>
                <p className="text-sm text-gray-500 mt-1">Position the QR code within the frame</p>
              </div>
              
              <div id="qr-reader" className="w-full rounded-lg overflow-hidden"></div>
              
              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600 mb-4"></div>
              <p className="text-gray-600">Verifying ticket...</p>
            </div>
          )}

          {/* Ticket Details */}
          {ticket && !loading && (
            <div className="p-6">
              {/* Status Badge */}
              <div className="text-center mb-6">
                {!ticket.checkedIn ? (
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-3">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-3">
                    <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                )}
                <h2 className={`text-2xl font-bold ${ticket?.checkedIn ? 'text-orange-600' : 'text-green-600'}`}>
                  {ticket.checkedIn ? 'Already Checked In' : 'Valid Ticket'}
                </h2>
              </div>

              {/* Ticket Info */}
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Event</p>
                  <p className="font-semibold text-gray-800">{ticket?.event?.eventDetails?.eventTitle}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Ticket ID</p>
                  <p className="font-mono font-semibold text-gray-800">{ticket?.ticketId}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Attendee Name</p>
                  <p className="font-semibold text-gray-800">{ticket?.fullName}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email</p>
                  <p className="text-gray-800">{ticket?.email}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Phone Number</p>
                  <p className="text-gray-800">{ticket?.phoneNumber}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {!ticket.checkedIn ? (
                  <button
                    onClick={handleCheckIn}
                    disabled={checkingIn}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {checkingIn ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Checking In...
                      </span>
                    ) : (
                      'Check In Attendee'
                    )}
                  </button>
                ) : (
                  <div className="bg-orange-50 border border-orange-200 text-orange-700 px-4 py-3 rounded-xl text-center">
                    <p className="font-semibold">This ticket has already been used</p>
                    <p className="text-sm mt-1">Scanned at a previous time</p>
                  </div>
                )}

                <button
                  onClick={resetScanner}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Scan Another Ticket
                </button>
              </div>

              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}