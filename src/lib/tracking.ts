import posthog from 'posthog-js'

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.capture(eventName, properties)
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties)
  }
}

export const trackClick = (category: string, label?: string, value?: any) => {
  trackEvent('click', {
    category,
    label,
    value,
    timestamp: new Date().toISOString(),
  })
}

export const trackCVDownload = () => {
  trackEvent('cv_download', {
    timestamp: new Date().toISOString(),
  })
}

export const trackProjectView = (projectName: string) => {
  trackEvent('project_view', {
    project_name: projectName,
    timestamp: new Date().toISOString(),
  })
}

export const trackContactAttempt = (method: string) => {
  trackEvent('contact_attempt', {
    method,
    timestamp: new Date().toISOString(),
  })
}

export const trackServiceRequest = (service: string) => {
  trackEvent('service_request', {
    service,
    timestamp: new Date().toISOString(),
  })
}

export const trackExternalLink = (url: string, type: 'social' | 'client' | 'project' | 'other') => {
  trackEvent('external_link_click', {
    url,
    type,
    timestamp: new Date().toISOString(),
  })
}