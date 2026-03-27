'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

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

type ScanState = 'scanning' | 'loading' | 'result' | 'success';

export default function TicketScanner() {
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [error, setError] = useState('');
  const [scanState, setScanState] = useState<ScanState>('scanning');
  const [checkingIn, setCheckingIn] = useState(false);
  const [scannedData, setScannedData] = useState<{ txnId: string; ticketId: string } | null>(null);

  const scannerRef = useRef<Html5Qrcode | null>(null);
  // Track whether the scanner is currently running so we never double-start it
  const isScanningRef = useRef(false);

  // ─── START SCANNER ────────────────────────────────────────────────────────
  const startScanner = useCallback(async () => {
    if (isScanningRef.current) return; // already running — do nothing
    try {
      await scannerRef.current?.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 260, height: 260 } },
        onScanSuccess,
        () => {}
      );
      isScanningRef.current = true;
    } catch {
      setError('Camera access denied or not supported.');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── STOP SCANNER ─────────────────────────────────────────────────────────
  const stopScanner = useCallback(async () => {
    if (!isScanningRef.current) return; // not running — nothing to stop
    try {
      await scannerRef.current?.stop();
    } catch {}
    isScanningRef.current = false;
  }, []);

  // ─── INIT ON MOUNT ────────────────────────────────────────────────────────
  useEffect(() => {
    // The #qr-reader div is always in the DOM (just hidden via CSS), so this is safe
    scannerRef.current = new Html5Qrcode('qr-reader');
    startScanner();

    return () => {
      // Cleanup on unmount
      scannerRef.current?.stop().catch(() => {});
      isScanningRef.current = false;
    };
  }, [startScanner]);

  // ─── SCAN SUCCESS CALLBACK ────────────────────────────────────────────────
  // useCallback ensures the scanner always has a stable reference
  const onScanSuccess = useCallback(async (decodedText: string) => {
    try {
      const url = new URL(decodedText);
      const txnId = url.searchParams.get('txnId');
      const ticketId = url.searchParams.get('ticketId');

      if (!txnId || !ticketId) {
        setError('Invalid ticket QR code');
        return;
      }

      navigator.vibrate?.(100);
      await stopScanner();

      setScannedData({ txnId, ticketId });

      // Verify inline so we don't close over a stale verifyTicket reference
      setScanState('loading');
      setError('');

      try {
        const res = await fetch(
          `http://localhost:5000/api/payment/check-in?txnId=${txnId}&ticketId=${ticketId}`
        );
        const data = await res.json();

        if (res.ok) {
          setTicket(data.ticket);
          setScanState('result');
        } else {
          setError(data.message || 'Invalid ticket');
          setScanState('scanning');
          await startScanner();
        }
      } catch {
        setError('Network error. Try again.');
        setScanState('scanning');
        await startScanner();
      }
    } catch {
      setError('Invalid QR format');
    }
  }, [startScanner, stopScanner]);

  // ─── CHECK-IN ─────────────────────────────────────────────────────────────
  const handleCheckIn = async () => {
    if (!scannedData) return;

    setCheckingIn(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/tickets/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scannedData),
      });

      const data = await res.json();

      if (res.ok) {
        setTicket(prev => (prev ? { ...prev, checkedIn: true } : null));
        setScanState('success');

        // Auto-restart after 2.5s
        setTimeout(async () => {
          setTicket(null);
          setScannedData(null);
          setError('');
          setScanState('scanning');
          await startScanner();
        }, 2500);
      } else {
        setError(data.message || 'Check-in failed');
      }
    } catch {
      setError('Check-in error');
    } finally {
      setCheckingIn(false);
    }
  };

  // ─── MANUAL RESTART (Scan Another / Scan Next buttons) ───────────────────
  const restartScanner = async () => {
    setTicket(null);
    setScannedData(null);
    setError('');
    setScanState('scanning');
    await startScanner();
  };

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white px-4 py-10">
      <div className="max-w-md mx-auto">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Decave Scanner</h1>
          <p className="text-purple-300 text-sm">Fast Ticket Check-In</p>
        </div>

        {/*
          The #qr-reader div MUST always stay mounted in the DOM.
          Html5Qrcode needs the element to exist when .start() is called.
          We use CSS (hidden) to hide it instead of conditional rendering.
        */}
        <div className={scanState === 'scanning' ? 'block' : 'hidden'}>
          <div className="bg-white rounded-2xl p-4 shadow-xl">
            <div id="qr-reader" className="w-full rounded-xl overflow-hidden" />
            {error && (
              <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
            )}
          </div>
        </div>

        {/* LOADING */}
        {scanState === 'loading' && (
          <div className="text-center py-10">
            <div className="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-3" />
            <p>Verifying ticket...</p>
          </div>
        )}

        {/* ✅ SUCCESS STATE */}
        {scanState === 'success' && ticket && (
          <div className="bg-white text-black rounded-2xl p-6 shadow-xl space-y-4 text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto">
              <svg className="w-9 h-9 text-green-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-600">Checked In Successfully!</h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong className="text-black">{ticket.fullName}</strong></p>
              <p>{ticket.event?.eventDetails?.eventTitle}</p>
            </div>
            <p className="text-xs text-gray-400">Restarting scanner...</p>
          </div>
        )}

        {/* RESULT — valid ticket or already checked in */}
        {scanState === 'result' && ticket && (
          <div className="bg-white text-black rounded-2xl p-6 shadow-xl space-y-4">

            <div className="text-center">
              {ticket.checkedIn ? (
                <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                    <h2 className="text-lg font-bold text-green-600">Ticket Checked In</h2>
                  </div>
                  <p className="text-xs text-green-500">This ticket has been checked in Successfully.</p>
                </div>
              ) : (
                <h2 className="text-xl font-bold text-green-600">Valid Ticket ✓</h2>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <p><strong>Event:</strong> {ticket?.event?.eventDetails?.eventTitle}</p>
              <p><strong>Name:</strong> {ticket?.fullName}</p>
              <p><strong>Email:</strong> {ticket?.email}</p>
              <p><strong>Ticket ID:</strong> {ticket?.ticketId}</p>
            </div>

            {/* Check In button — only for tickets not yet checked in */}
            {!ticket.checkedIn && (
              <button
                onClick={handleCheckIn}
                disabled={checkingIn}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold disabled:opacity-60"
              >
                {checkingIn ? 'Checking in...' : 'Check In'}
              </button>
            )}

            {/* Scan Another / Scan Next — always visible */}
            <button
              onClick={restartScanner}
              className="w-full bg-gray-100 hover:bg-gray-200 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {ticket.checkedIn ? 'Scan Another Ticket' : 'Scan Next'}
            </button>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}