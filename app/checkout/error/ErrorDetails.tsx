import { PiWarningCircleBold } from "react-icons/pi";

export default function ErrorDetails() {
  return (
    <div className="bg-[#151515] w-full max-w-3xl mx-auto p-4">
      <div className="flex gap-2">
        <PiWarningCircleBold size={28} className="text-[#EF4444]" />
        <div>
          <h3 className="text-[#F9F7F4] text-xl lg:text-3xl font-semibold mb-4">
            Transaction Error
          </h3>
          <p className="text-[#b3b3b3]">
            Your payment could not be completed at this time. This could be due
            to several reasons.
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-[#2a2a2a] pt-10 flex flex-col gap-3">
        <h4 className="font-semibold text-[#b3b3b3] mb-4">COMMON ISSUES </h4>
        <div className="border-2 border-[#2a2a2a] p-4">
          <p className="text-[#F9F7F4] font-semibold text-lg">
            Insufficient fund
          </p>
          <p className="text-[#b3b3b3] mt-2">
            Your card or account may not have enough balance to complete this
            transaction.
          </p>
        </div>

        <div className="border-2 border-[#2a2a2a] p-4">
          <p className="text-[#F9F7F4] font-semibold text-lg">Cards declined</p>
          <p className="text-[#b3b3b3] mt-2">
            Your bank may have declined the transaction. Contact your bank for
            details.
          </p>
        </div>

        <div className="border-2 border-[#2a2a2a] p-4">
          <p className="text-[#F9F7F4] font-semibold text-lg">Network error</p>
          <p className="text-[#b3b3b3] mt-2">
            A temporary network issue may have interrupted the payment process.
          </p>
        </div>

        <div className="border-2 border-[#2a2a2a] p-4">
          <p className="text-[#F9F7F4] font-semibold text-lg">
            Incorrect card details
          </p>
          <p className="text-[#b3b3b3] mt-2">
            Please verify your card number, expiry date, and CVV are correct.
          </p>
        </div>
      </div>
    </div>
  );
}
