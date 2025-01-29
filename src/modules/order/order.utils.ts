import Shurjopay, { PaymentResponse, VerificationResponse } from "shurjopay";
import {
  sp_endpoint,
  sp_password,
  sp_prefix,
  sp_return_url,
  sp_username,
} from "../../config";

const shurjopay = new Shurjopay();

shurjopay.config(
  sp_endpoint!,
  sp_username!,
  sp_password!,
  sp_prefix!,
  sp_return_url!
);

// console.log(shurjopay);

const makePaymentAsync = async (
  paymentPayload: any
): Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    shurjopay.makePayment(
      paymentPayload,
      (response) => resolve(response),
      (error) => reject(error)
    );
  });
};

const verifyPaymentAsync = (
  order_id: string
): Promise<VerificationResponse[]> => {
  return new Promise((resolve, reject) => {
    shurjopay.verifyPayment(
      order_id,
      (response) => resolve(response),
      (error) => reject(error)
    );
  });
};

export const orderUtils = {
  makePaymentAsync,
  verifyPaymentAsync,
};
