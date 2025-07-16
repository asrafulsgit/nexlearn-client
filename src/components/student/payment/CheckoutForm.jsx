import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { AuthContext } from "../../../controllers/AuthProvider";
import { Link, useParams } from "react-router";
import { apiRequiestWithCredentials } from "../../../utilities/handleApis";

const CheckoutForm = () => {
  const { userInfo } = useContext(AuthContext);
  const { sessionId } = useParams();
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const [billingDetails, setBillingDetails] = useState({
    email: userInfo?.email || "",
    phone: "",
    name: userInfo?.name || "",
  });

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!stripe || !elements) return;

  const card = elements.getElement(CardElement);
  if (!card) return;

  if (cardComplete) setProcessing(true);

  // Step 1: Create PaymentMethod
  const payload = await stripe.createPaymentMethod({
    type: "card",
    card,
    billing_details: billingDetails,
  });

  if (payload.error) {
    setError(payload.error);
    setProcessing(false);
    return;
  }

  try {
    // Step 2: Call backend WITHOUT paymentMethodId
    const data = await apiRequiestWithCredentials("post", "/payment/intent", {
      sessionId,
    });
    
    const { clientSecret } = data;

    // Step 3: Confirm the payment on client
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: payload.paymentMethod.id,
    });

    if (result.error) {
      setError(result.error);
      setProcessing(false);
    } else if (result.paymentIntent.status === "succeeded") {
      setPaymentMethod(payload.paymentMethod);
      setProcessing(false);
    }
  } catch (err) {
    console.error("Payment error", err);
    setError({ message: "Payment failed. Try again." });
    setProcessing(false);
  }
};



  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({ email: "", phone: "", name: "" });
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-white shadow-xl rounded-lg p-6">
      {paymentMethod ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold text-green-600 mb-2">
            ✅ Payment Successful
          </h2>
          <p className="text-gray-600 mb-4">
            Your PaymentMethod ID: <span className="font-mono">{paymentMethod.id}</span>
          </p>
          {/* <ResetButton onClick={reset} /> */}
         <Link to={`/session/${sessionId}`}> 
         <button
            type="button"
            onClick={reset}
            className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200"
          >
            Back to the Session
          </button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">Checkout</h2>

          <Field
            label="Full Name"
            id="name"
            type="text"
            placeholder="Jane Doe"
            value={billingDetails.name}
            onChange={(e) => setBillingDetails({ ...billingDetails, name: e.target.value })}
          />
          <Field
            label="Email Address"
            id="email"
            type="email"
            placeholder="janedoe@example.com"
            value={billingDetails.email}
            onChange={(e) => setBillingDetails({ ...billingDetails, email: e.target.value })}
          />
          <Field
            label="Phone Number"
            id="phone"
            type="tel"
            placeholder="+880 123 456 789"
            value={billingDetails.phone}
            onChange={(e) => setBillingDetails({ ...billingDetails, phone: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Details</label>
            <div className="p-3 border border-gray-300 rounded-md bg-white">
              <CardField
                onChange={(e) => {
                  setError(e.error);
                  setCardComplete(e.complete);
                }}
              />
            </div>
          </div>

          {error && <ErrorMessage>{error.message}</ErrorMessage>}

          <SubmitButton processing={processing} error={error} disabled={!stripe}>
            Pay $25
          </SubmitButton>
        </form>
      )}
    </div>
  );
};

const Field = ({ label, id, type, placeholder, value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600"
    />
  </div>
);

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#16a34a",
      color: "#1f2937",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#9ca3af",
      },
    },
    invalid: {
      iconColor: "#ef4444",
      color: "#ef4444",
    },
  },
};

const CardField = ({ onChange }) => <CardElement options={CARD_OPTIONS} onChange={onChange} />;

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    type="submit"
    disabled={processing || disabled}
    className={`w-full py-2 cursor-pointer px-4 text-white font-semibold rounded-md transition-colors ${
      processing || disabled
        ? "bg-green-300 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700"
    }`}
  >
    {processing ? "Processing..." : children}
  </button>
);

const ErrorMessage = ({ children }) => (
  <div className="text-sm text-red-600 bg-red-50 border border-red-300 rounded-md p-2 mt-2">
    {children}
  </div>
);

// const ResetButton = ({ onClick }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200"
//   >
//     Make Another Payment
//   </button>
// );

export default CheckoutForm;