import qs from 'query-string'
import toRegex from 'path-to-regexp'

function matchURI (pattern, keys, { pathname, search }) {
  const match = pattern.exec(pathname)
  if (!match) return null
  const params = {}

  for (let i = 1; i < match.length; i++) {
    params[keys[i - 1].name] =
			match[i] !== undefined ? match[i] : undefined
  }

  return [{ ...params, ...qs.parse(search) }, match[0]]
};

function compilePath (path, { exact }) {
  const keys = []

  const regex = toRegex(path, keys, { end: !!exact })

  return [regex, keys]
}

const cache = {}

function matchPath (path, { exact = false }, context) {
  if (!path) return []

  const key = `${path}${exact.toString()}`

  const [regex, keys] = cache[key] || compilePath(path, { exact })

  cache[key] = [regex, keys]

  return matchURI(regex, keys, context)
}

export default matchPath
