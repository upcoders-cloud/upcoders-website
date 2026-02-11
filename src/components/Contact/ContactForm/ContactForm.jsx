import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import DefaultInput from 'components/ui/DefaultInput/DefaultInput.jsx'
import DefaultCheckbox from 'components/ui/DefaultCheckbox/DefaultCheckbox.jsx'
import DefaultButton from 'components/ui/DefaultButton/DefaultButton.jsx'
import { useI18n } from '@/i18n/useI18n.js'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
const EMPTY_STRING = ''
const ON_TOUCHED_EVENT = 'onTouched'
const POST = 'POST'
const APPLICATION_JSON = 'application/json'
const CONTENT_TYPE = 'Content-Type'

export default function ContactForm() {
  const { t } = useI18n()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setFocus,
    reset,
  } = useForm({
    mode: ON_TOUCHED_EVENT,
    defaultValues: {
      email: EMPTY_STRING,
      phone: EMPTY_STRING,
      privacy: false,
    },
  })

  const onSubmit = async (data) => {
    if (!WEB3FORMS_ACCESS_KEY) {
      toast.error(t('contact.form.toasts.missingConfig'))
      return
    }

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
          subject: t('contact.form.web3.subject'),
          from_name: t('contact.form.web3.fromName'),
        }),
      })

      const result = await response.json()
      if (result.success) {
        toast.success(result.message || t('contact.form.toasts.success'))
        reset()
      } else {
        toast.error(result.message || t('contact.form.toasts.failed'))
      }
    } catch (error) {
      toast.error(t('contact.form.toasts.failed'))
      console.error(error)
      console.error(t('contact.form.toasts.clientError'))
    }
  }

  const onError = (formErrors) => {
    const firstErrorField = Object.keys(formErrors)[0]
    if (firstErrorField) setFocus(firstErrorField)
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit, onError)}
      className="relative bg-[#2B2B2B] rounded-lg p-6 md:p-7 w-full shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
    >
      <DefaultInput
        label={t('contact.form.labels.email')}
        type="email"
        placeholder={t('contact.form.placeholders.input')}
        registration={register('email', {
          required: t('contact.form.errors.emailRequired'),
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: t('contact.form.errors.emailInvalid'),
          },
        })}
        error={errors.email?.message}
      />

      <DefaultInput
        label={t('contact.form.labels.phone')}
        type="tel"
        placeholder={t('contact.form.placeholders.input')}
        className="mt-4"
        registration={register('phone', {
          pattern: {
            value: /^[0-9+\s()-]{5,}$/,
            message: t('contact.form.errors.phoneInvalid'),
          },
        })}
        error={errors.phone?.message}
      />

      <DefaultCheckbox
        className="mt-8"
        label={t('contact.form.labels.privacy')}
        registration={register('privacy', {
          required: t('contact.form.errors.privacyRequired'),
        })}
        error={errors.privacy?.message}
      />

      <div className="mt-4 flex justify-end">
        <DefaultButton
          type="submit"
          label={isSubmitSuccessful ? t('contact.form.buttons.sent') : t('contact.form.buttons.send')}
          disabled={isSubmitting}
          loading={isSubmitting}
        />
      </div>
    </form>
  )
}
