/* eslint-disable @typescript-eslint/no-unused-vars */
import { runBenchScript } from '@naturalcycles/bench-lib'

import { NonNull } from '../src/util'

const match = 'cde'.match(
  /?<a>[a])|(?<b>[b])|(?<c>[c])|(?<d>[d])|(?<e>[e])|(?<f>[f])|(?<g>[g])|(?<h>[h])|(?<i>[i])|(?<j>[j])/
)!

runBenchScript({
  runs: 3,
  name: 'bench',
  reportDirPath: './bench/results',
  fns: {
    'Object.entries()': done => {
      const result = Object.entries(
        match.groups as { [key: string]: string }
      ).find(NonNull)
      done.resolve()
    },

    'for-in': done => {
      let result
      for (const key in match.groups) {
        if (match.groups[key] != null) {
          result = [key, match.groups[key]]
          break
        }
      }
      done.resolve()
    }
  }
})
