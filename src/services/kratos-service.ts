import { LoginRequest, PublicApi, RecoveryRequest, RegistrationRequest, SettingsRequest, VerificationRequest } from "@oryd/kratos-client"
import config from "config/kratos"

const kratos = new PublicApi(config.kratos.public)

export const initialiseRequest = ({ type  }: { type: "login" | "register" | "settings" | "verify" | "recover"  }) : Promise<LoginRequest | RegistrationRequest | SettingsRequest | VerificationRequest | RecoveryRequest> => {
  const endpoints = {
    login: `${config.kratos.browser }/self-service/browser/flows/login?return_to=${config.baseUrl}/callback`,
    register: `${config.kratos.browser }/self-service/browser/flows/registration?return_to=${config.baseUrl}/callback`,
    settings: `${config.kratos.browser }/self-service/browser/flows/settings`,
    verify: `${config.kratos.public}/self-service/browser/flows/verification/init/email`,
    recover: `${config.kratos.public}/self-service/browser/flows/recovery`
  }

  return new Promise((resolve, reject) => {
    const params = new URLSearchParams(window.location.search)
    const request = params.get("request") || ""
    const endpoint = endpoints[type]

    // Ensure request exists in params.
    if (!request) return window.location.href = endpoint

    let authRequest: Promise<any> | undefined
    if (type === "login") authRequest = kratos.getSelfServiceBrowserLoginRequest(request)
    else if (type === "register") authRequest = kratos.getSelfServiceBrowserRegistrationRequest(request)
    else if (type === "settings") authRequest = kratos.getSelfServiceBrowserSettingsRequest(request)
    else if (type === "verify") authRequest = kratos.getSelfServiceVerificationRequest(request)
    else if (type === "recover") authRequest = kratos.getSelfServiceBrowserRecoveryRequest(request)

    if (!authRequest) return reject()

    authRequest.then(({ body, response }) => {
      if (response.statusCode !== 200) return reject(body)
      resolve(body)
    }).catch(error => {
      return window.location.href = endpoint
    })
  })
}
