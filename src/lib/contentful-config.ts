/**
 * Contentful Content Type IDs Configuration
 *
 * This file centralizes all Contentful content type IDs used throughout the application.
 * Update these values when content types are created/modified in Contentful.
 */

// Content Type IDs
export const CONTENTFUL_CONTENT_TYPES = {
  // Page content type - for static pages like /blogs, /portfolio, /work
  PAGE: '3pVhC7wM9WZ3z17KtUYuIZ',

  // Blog content type - for blog posts
  BLOG: '4iLx5UCNPIE6SrGNHluzUR',

  // Project content type - for portfolio projects
  PROJECT: '2lKIjWiLF8dc9Jf62IFBgm',

  // Site content type - for site-wide settings
  SITE: '2qhahjwIjTSw5YY2i08AQf',

  // Quote content type - for inspirational quotes
  QUOTE: 'SOMGXDcaHTVOSmfHiHN3u',

  // Experience content type - for work experience
  EXPERIENCE: '3X8gmc3px60PrqMJi7kADy',

  // Contact content type - for contact information
  CONTACT: '3wPX3nyvcvpLirGdlmQqav',
} as const

// Content Type ID values for API calls
export const CONTENT_TYPE_IDS = {
  PAGE: '3pVhC7wM9WZ3z17KtUYuIZ',
  BLOG: '4iLx5UCNPIE6SrGNHluzUR',
  PROJECT: '2lKIjWiLF8dc9Jf62IFBgm',
  SITE: '2qhahjwIjTSw5YY2i08AQf',
  QUOTE: 'SOMGXDcaHTVOSmfHiHN3u',
  EXPERIENCE: '3X8gmc3px60PrqMJi7kADy',
  CONTACT: '3wPX3nyvcvpLirGdlmQqav',
} as const

// Type-safe content type keys
export type ContentTypeKey = keyof typeof CONTENTFUL_CONTENT_TYPES
export type ContentTypeId = typeof CONTENTFUL_CONTENT_TYPES[ContentTypeKey]

// Helper function to get content type ID by key
export function getContentTypeId(key: ContentTypeKey): ContentTypeId {
  return CONTENTFUL_CONTENT_TYPES[key]
}

// Helper function to check if a content type ID exists
export function isValidContentTypeId(id: string): id is ContentTypeId {
  return Object.values(CONTENTFUL_CONTENT_TYPES).includes(id as ContentTypeId)
}