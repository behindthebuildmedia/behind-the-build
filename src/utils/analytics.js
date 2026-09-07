/**
 * Google Analytics 4 (gtag.js) Integration Utility
 * Measurement ID: G-B5B2VXY0BT
 */

export const GA_MEASUREMENT_ID = 'G-B5B2VXY0BT';

/**
 * Safely track page views across client-side SPA route transitions
 */
export const trackPageView = (path, title) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const pagePath = path || window.location.pathname;
    const pageTitle = title || document.title;
    const pageLocation = `https://www.behindthebuild.in${pagePath}`;

    window.gtag('event', 'page_view', {
      page_title: pageTitle,
      page_location: pageLocation,
      page_path: pagePath,
      send_to: GA_MEASUREMENT_ID,
    });
  }
};

/**
 * Generic custom event dispatcher
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      ...eventParams,
      send_to: GA_MEASUREMENT_ID,
    });
  }
};

/**
 * Custom Event: start_project_click
 * Trigger: user clicks "START A PROJECT"
 */
export const trackStartProjectClick = (locationLabel = 'hero') => {
  trackEvent('start_project_click', {
    click_location: locationLabel,
  });
};

/**
 * Custom Event: booking_started
 * Trigger: user begins the project booking flow
 */
export const trackBookingStarted = (serviceOrPlan = 'custom') => {
  trackEvent('booking_started', {
    entry_point: serviceOrPlan,
  });
};

/**
 * Custom Event: booking_submitted
 * Trigger: successful booking submission
 * Note: Never sends any PII (names, emails, phones, addresses)
 */
export const trackBookingSubmitted = (bookingId, serviceName, planName) => {
  trackEvent('booking_submitted', {
    booking_id: bookingId || undefined,
    service_name: serviceName || undefined,
    plan_name: planName || undefined,
  });
};

/**
 * Custom Event: service_view
 * Parameters: service_name
 */
export const trackServiceView = (serviceName) => {
  trackEvent('service_view', {
    service_name: serviceName,
  });
};

/**
 * Custom Event: contact_click
 * Trigger: user clicks a contact CTA
 */
export const trackContactClick = (channel = 'general') => {
  trackEvent('contact_click', {
    contact_channel: channel,
  });
};

/**
 * Custom Event: email_click
 * Trigger: user clicks an email address/mail link
 */
export const trackEmailClick = (emailTarget = 'admin@behindthebuild.in') => {
  trackEvent('email_click', {
    email_address: emailTarget,
  });
};
