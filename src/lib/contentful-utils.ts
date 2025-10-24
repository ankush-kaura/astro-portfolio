import { contentfulClient } from './contentful';
import type { EntryFieldTypes } from 'contentful';

/**
 * Generic function to fetch Contentful entries with error handling
 */
export async function fetchContentfulEntries(
  contentType: string,
  options: { limit?: number; order?: string } = {}
) {
  try {
    const { limit = 10, order } = options;
    const query: any = { content_type: contentType };

    if (order) {
      query.order = order;
    }

    const entries = await contentfulClient.getEntries(query);

    return {
      success: true,
      data: entries.items,
      error: null
    };
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Interface definitions for content types
 */
export interface AboutContent {
  contentTypeId: 'about';
  fields: {
    intro: EntryFieldTypes.Text;
    tools: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    introBottom: EntryFieldTypes.Text;
  };
}

export interface ExperienceContent {
  contentTypeId: 'experience';
  fields: {
    company: EntryFieldTypes.Text;
    position: EntryFieldTypes.Text;
    location?: EntryFieldTypes.Text;
    start: EntryFieldTypes.Text;
    end?: EntryFieldTypes.Text;
    link?: EntryFieldTypes.Text;
    tasks?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  };
}

export interface StudyContent {
  contentTypeId: 'study';
  fields: {
    title: EntryFieldTypes.Text;
    institution: EntryFieldTypes.Text;
    link?: EntryFieldTypes.Text;
    date: EntryFieldTypes.Text;
  };
}

export interface ContactContent {
  contentTypeId: 'contact';
  fields: {
    email: EntryFieldTypes.Text;
    location?: EntryFieldTypes.Text;
    github?: EntryFieldTypes.Text;
    linkedin?: EntryFieldTypes.Text;
    instagram?: EntryFieldTypes.Text;
  };
}

import { CONTENTFUL_CONTENT_TYPES } from './contentful-config'

export interface BlogContent {
  sys: {
    id: string;
  };
  contentTypeId: typeof CONTENTFUL_CONTENT_TYPES.BLOG;
  fields: {
    title: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    content: EntryFieldTypes.RichText;
    heroImage?: any;
    date: EntryFieldTypes.Date;
  };
}

export interface PageContent {
  contentTypeId: typeof CONTENTFUL_CONTENT_TYPES.PAGE;
  fields: {
    slug: EntryFieldTypes.Text;
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
  };
}

/**
 * Loading component for consistent loading states
 */
export function LoadingState({ message = "Loading..." }: { message?: string }) {
  return `<div class="text-sm text-gray-500 animate-pulse">${message}</div>`;
}

/**
 * Error component for consistent error states
 */
export function ErrorState({ error }: { error: string }) {
  return `<div class="text-sm text-red-500">Error: ${error}</div>`;
}

/**
 * Utility function to get Contentful image URL
 */
export function getContentfulImageUrl(image: any): string | null {
  if (!image || !image.fields || !image.fields.file || !image.fields.file.url) {
    return null;
  }
  return `https:${image.fields.file.url}`;
}

/**
 * Utility function to get Contentful image alt text
 */
export function getContentfulImageAlt(image: any, fallback: string): string {
  if (!image || !image.fields || !image.fields.title) {
    return fallback;
  }
  return image.fields.title;
}