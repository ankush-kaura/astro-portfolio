declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export function trackEvent(eventName: string, parameters: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
}

export function trackPageView(pagePath: string, pageTitle?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', import.meta.env.GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
}

export function trackBlogView(slug: string, title: string) {
  trackEvent('blog_view', {
    blog_slug: slug,
    blog_title: title,
  });
}

export function trackProjectView(slug: string, title: string) {
  trackEvent('project_view', {
    project_slug: slug,
    project_title: title,
  });
}

export function trackContactClick(method: string) {
  trackEvent('contact_click', {
    contact_method: method,
  });
}

export function trackThemeToggle(theme: string) {
  trackEvent('theme_toggle', {
    theme: theme,
  });
}

export function trackOutboundLink(url: string) {
  trackEvent('outbound_link', {
    link_url: url,
  });
}

export function trackResumeDownload(filename: string) {
  trackEvent('resume_download', {
    resume_filename: filename,
  });
}