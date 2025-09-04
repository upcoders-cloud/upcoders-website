import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import DefaultInput from "components/ui/DefaultInput/DefaultInput.jsx";
import DefaultCheckbox from "components/ui/DefaultCheckbox/DefaultCheckbox.jsx";
import DefaultButton from "components/ui/DefaultButton/DefaultButton.jsx";

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '186b0ac8-8348-4913-9963-ea419a09886e';
const EMPTY_STRING = "";
const ON_TOUCHED_EVENT = "onTouched";
const POST = "POST";
const APPLICATION_JSON = "application/json";
const CONTENT_TYPE = "Content-Type";

export default function ContactForm() {
  const [integrationResult, setIntegrationResult] = React.useState(false);
  const [integrationMessage, setIntegrationMessage] = React.useState(EMPTY_STRING);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setValue,
    setFocus,
    reset,
    control
  } = useForm({
    mode: ON_TOUCHED_EVENT,
    defaultValues: {
      email: EMPTY_STRING,
      phone: EMPTY_STRING,
      privacy: false,
    },
  });

  const onSubmit = async (data, e) => {
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: POST,
        headers: {
          [CONTENT_TYPE]: APPLICATION_JSON,
          Accept: APPLICATION_JSON,
        },
        body: JSON.stringify({
          ...data,
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Someone sent a message from our Website",
          from_name: "Upcoders page"
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message || "Message sent successfully.");
        setIntegrationResult(true);
        setIntegrationMessage(result.message);
        e.target.reset();
        reset();
      } else {
        toast.error(result.message || "Submission failed.");
        setIntegrationResult(false);
        setIntegrationMessage(result.message || "Submission failed.");
      }
    } catch (error) {
      toast.error("Submission failed.");
      console.error(error);
      setIntegrationResult(false);
      setIntegrationMessage("Client Error. Please check the console for more info");
    }
  };

  const onError = (errs) => {
    console.log(errs)
    const first = Object.keys(errs)[0];
    if (first) setFocus(first);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit, onError)}
      className="relative bg-[#2B2B2B] rounded-lg p-6 md:p-7 w-full shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
    >
      <DefaultInput
        label="Email"
        type="email"
        placeholder="Type here..."
        registration={register("email", {
          required: "Email is required.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address.",
          },
        })}
        error={errors.email?.message}
      />
      <DefaultInput
        label="Phone number"
        type="tel"
        placeholder="Type here..."
        className="mt-4"
        registration={register("phone", {
          pattern: {
            value: /^[0-9+\s()-]{5,}$/,
            message: "Please enter a valid phone number.",
          },
        })}
        error={errors.phone?.message}
      />
      <DefaultCheckbox
        className="mt-8"
        label="I agree to the privacy policy terms *"
        registration={register("privacy", {
          required: "Check the agreement to continue",
        })}
        error={errors.privacy?.message}
      />
      <div className="mt-4 flex justify-end">
        <DefaultButton
          type="submit"
          label={isSubmitSuccessful ? "SENT" : "SEND MESSAGE"}
          disabled={isSubmitting}
          loading={isSubmitting}
        />
      </div>
    </form>
  );
}
