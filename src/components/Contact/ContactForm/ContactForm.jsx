import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import DefaultInput from 'components/ui/DefaultInput/DefaultInput.jsx'
import DefaultCheckbox from 'components/ui/DefaultCheckbox/DefaultCheckbox.jsx'
import DefaultButton from 'components/ui/DefaultButton/DefaultButton.jsx'
import { useI18n } from '@/i18n/useI18n.js'
import { buildLocalizedPath } from '@/i18n/routing.js'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
const EMPTY_STRING = ''
const ON_TOUCHED_EVENT = 'onTouched'
const POST = 'POST'
const APPLICATION_JSON = 'application/json'
const CONTENT_TYPE = 'Content-Type'
const MESSAGE_MIN_LENGTH = 20
const MESSAGE_MAX_LENGTH = 5000
const SERVER_ERROR = 'root.server'

export default function ContactForm() {
  const { t, language } = useI18n()
  // Set only after Web3Forms confirms the submission, never optimistically.
  const [isSent, setIsSent] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setFocus,
    reset,
  } = useForm({
    mode: ON_TOUCHED_EVENT,
    defaultValues: {
      name: EMPTY_STRING,
      email: EMPTY_STRING,
      phone: EMPTY_STRING,
      message: EMPTY_STRING,
      privacy: false,
    },
  })

  const failSubmission = (message) => {
    setError(SERVER_ERROR, { type: 'server', message })
    toast.error(message)
  }

  const onSubmit = async ({ name, email, phone, message, privacy }) => {
    setIsSent(false)

    if (!WEB3FORMS_ACCESS_KEY) {
      failSubmission(t('contact.form.toasts.missingConfig'))
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
          name,
          email,
          phone,
          message,
          privacy,
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: t('contact.form.web3.subject'),
          from_name: t('contact.form.web3.fromName'),
        }),
      })

      const result = await response.json().catch(() => null)
      if (response.ok && result?.success === true) {
        setIsSent(true)
        toast.success(t('contact.form.toasts.success'))
        reset()
        return
      }

      failSubmission(t('contact.form.toasts.failed'))
      console.error('Web3Forms rejected the submission', response.status, result?.message)
    } catch (error) {
      failSubmission(t('contact.form.toasts.failed'))
      console.error(error)
    }
  }

  const onError = (formErrors) => {
    const firstErrorField = Object.keys(formErrors).find((field) => field !== 'root')
    if (firstErrorField) setFocus(firstErrorField)
  }

  const serverError = errors.root?.server?.message

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit, onError)}
      aria-label={t('contact.form.label')}
      className="relative bg-[#2B2B2B] rounded-lg p-6 md:p-7 w-full shadow-[0_12px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/5 transition-shadow duration-300 hover:ring-primary/20 focus-within:ring-primary/40 focus-within:shadow-[0_12px_40px_rgba(82,113,255,0.18)]"
    >
      {/* Decorative top accent line */}
      <div
        aria-hidden="true"
        className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />
      <DefaultInput
        label={t('contact.form.labels.name')}
        autoComplete="name"
        placeholder={t('contact.form.placeholders.name')}
        registration={register('name', {
          maxLength: { value: 120, message: t('contact.form.errors.nameTooLong') },
        })}
        error={errors.name?.message}
      />

      <DefaultInput
        label={t('contact.form.labels.email')}
        type="email"
        autoComplete="email"
        required
        className="mt-4"
        placeholder={t('contact.form.placeholders.email')}
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
        autoComplete="tel"
        className="mt-4"
        placeholder={t('contact.form.placeholders.phone')}
        registration={register('phone', {
          pattern: {
            value: /^[0-9+\s()-]{5,}$/,
            message: t('contact.form.errors.phoneInvalid'),
          },
        })}
        error={errors.phone?.message}
      />

      <DefaultInput
        label={t('contact.form.labels.message')}
        multiline
        rows={5}
        required
        className="mt-4"
        placeholder={t('contact.form.placeholders.message')}
        registration={register('message', {
          required: t('contact.form.errors.messageRequired'),
          validate: (value) =>
            value.trim().length >= MESSAGE_MIN_LENGTH || t('contact.form.errors.messageTooShort'),
          maxLength: {
            value: MESSAGE_MAX_LENGTH,
            message: t('contact.form.errors.messageTooLong'),
          },
        })}
        error={errors.message?.message}
      />

      <DefaultCheckbox
        className="mt-8"
        required
        label={
          <>
            {t('contact.form.privacy.before')}
            <Link
              to={buildLocalizedPath(language, '/privacy')}
              className="text-primary-light underline underline-offset-2 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
            >
              {t('contact.form.privacy.link')}
            </Link>
            {t('contact.form.privacy.after')}
          </>
        }
        registration={register('privacy', {
          required: t('contact.form.errors.privacyRequired'),
        })}
        error={errors.privacy?.message}
      />

      {/* Live regions stay mounted so screen readers announce the text when it appears */}
      <div role="alert" className={serverError ? 'mt-6 text-sm text-red-400' : undefined}>
        {serverError}
      </div>
      <div role="status" className={isSent ? 'mt-6 text-sm text-green-400' : undefined}>
        {isSent ? t('contact.form.successMessage') : null}
      </div>

      <div className="mt-6 flex justify-end">
        <DefaultButton
          type="submit"
          label={isSent ? t('contact.form.buttons.sent') : t('contact.form.buttons.send')}
          loading={isSubmitting}
        />
      </div>
    </form>
  )
}
