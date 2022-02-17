import Vue from 'vue'
import type { AxiosRequestConfig } from 'axios'
import { BgyComponentComponent, BgyComponentComponentSize, BgyComponentHorizontalAlignment } from './component'

// import { BgyAsyncTree } from './async-tree'

export interface InstallationOptions {
  locale?: any,
  i18n?: any,
  size?: string,
  axiosConfig?: AxiosRequestConfig
}

/** The version of bgy-component */
export const version: string

/**
 * Install all bgy-component components into Vue.
 * Please do not invoke this method directly.
 * Call `Vue.use(BgyComponent)` to install.
 */
export function install(vue: typeof Vue, options: InstallationOptions): void

/** BgyComponent component common definition */
export type Component = BgyComponentComponent

/** Component size definition for button, input, etc */
export type ComponentSize = BgyComponentComponentSize

/** Horizontal alignment */
export type HorizontalAlignment = BgyComponentHorizontalAlignment

// TS cannot merge imported class with namespace, so declare subclasses instead

/** AsyncTree Component */
// export class AsyncTree extends BgyAsyncTree { }

