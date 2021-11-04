/**
 * A finder function that returns first entry that is not nullish.
 *
 * @param e An entry tuple as returned by Object.entries()
 *
 * @private
 */
export const NonNull = (e: [string, string?]) => e[1] != null
