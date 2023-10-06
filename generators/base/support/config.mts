/**
 * Copyright 2013-2023 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const filterNullishValues = value => value !== undefined && value !== null;

/**
 * Copy and remove null and undefined values
 * @param object
 * @returns
 */
// eslint-disable-next-line import/prefer-default-export
export function removeFieldsWithNullishValues(object: Record<string, any>): Record<string, any> {
  return filterValue(object, filterNullishValues);
}
/**
 * Copy and remove null and undefined values
 * @param object
 * @returns
 */
// eslint-disable-next-line import/prefer-default-export, @typescript-eslint/no-explicit-any
function filterValue(object: Record<string, any>, filterValue: (any) => boolean = filterNullishValues): Record<string, any> {
  const clone = {};
  for (const [key, value] of Object.entries(object)) {
    if (filterValue(value)) {
      if (typeof value === 'object') {
        if (Array.isArray(value)) {
          clone[key] = value.filter(filterValue);
        } else {
          clone[key] = removeFieldsWithNullishValues(value);
        }
      } else {
        clone[key] = value;
      }
    }
  }
  return clone;
}

/**
 * Picks every field from source.
 * A field with undefined value is returned for missing fields.
 */
export const pickFields = (source: Record<string | number, any>, fields: (string | number)[]) =>
  Object.fromEntries(fields.map(field => [field, source[field]]));

/**
 * Set application property with the return of the mutations property function or the property itself.
 * Applies for eache mutation object in order.
 *
 * @example
 * // application = { prop: 'foo-bar', prop2: 'foo2' }
 * mutateApplication(
 *   application,
 *   { prop: 'foo', prop2: ({ prop }) => prop + 2 },
 *   { prop: ({ prop }) => prop + '-bar' },
 * );
 */
export const mutateApplication = (application, ...mutations) => {
  for (const mutation of mutations) {
    for (const [key, value] of Object.entries(mutation)) {
      application[key] = typeof value === 'function' ? value(application) : value;
    }
  }
};
