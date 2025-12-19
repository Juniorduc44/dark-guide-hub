import axios from 'axios';

const LNBITS_URL = import.meta.env.VITE_LNBITS_URL;
const INVOICE_KEY = import.meta.env.VITE_LNBITS_INVOICE_KEY;

interface CreateInvoiceResponse {
  payment_request: string;
  payment_hash: string;
  checking_id: string;
}

interface CheckPaymentResponse {
  paid: boolean;
  payment_request: string;
  payment_hash: string;
}

export const lnbitsService = {
  createInvoice: async (amount: number, memo: string): Promise<CreateInvoiceResponse> => {
    try {
      const response = await axios.post(
        `${LNBITS_URL}/api/v1/payments`,
        {
          out: false,
          amount,
          memo,
        },
        {
          headers: {
            'X-Api-Key': INVOICE_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        payment_request: response.data.payment_request,
        payment_hash: response.data.payment_hash,
        checking_id: response.data.checking_id,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to create invoice: ${error.response?.data?.detail || error.message}`);
      }
      throw new Error('Failed to create invoice. Check your LNbits configuration.');
    }
  },

  checkPayment: async (paymentHash: string): Promise<CheckPaymentResponse> => {
    try {
      const response = await axios.get(
        `${LNBITS_URL}/api/v1/payments/${paymentHash}`,
        {
          headers: {
            'X-Api-Key': INVOICE_KEY,
          },
        }
      );

      return {
        paid: response.data.paid,
        payment_request: response.data.payment_request,
        payment_hash: response.data.payment_hash,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to check payment: ${error.response?.data?.detail || error.message}`);
      }
      throw new Error('Failed to check payment status.');
    }
  },
};
