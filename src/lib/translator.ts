import assetTrans from '$assets/translations'

const getLang = (): string => {
  // well, maybe base the language from
  // -> where the guest coming from? via API to determine their IP Address
  // -> or when they're logged in, base it from their
  //    preferred language by storing that in the hooks
  // ohh, you should cache that too, :P

  return 'en'
}

const getData = (lang: string) => {
  // ofcourse get the data via api, below is just a sample!
  // cache this one as well

  return assetTrans[lang]
}

export const trans = (text: string, replacers?: any, strict = false): string => {
  const lang = getLang()
  const data = getData(lang)

  let resp = data[text]

  if (resp === undefined) {
    if (strict) {
      throw Error(`Translation for ${text} not found under [${lang}] language.`)
    }

    resp = text
  }

  if (replacers !== undefined) {
    Object.keys(replacers).forEach((idx) => {
      resp = resp.replace(`:${idx}`, replacers[idx]) // Laravel like translations...
      resp = resp.replace(`{${idx}}`, replacers[idx]) // I have no idea...
    })
  }

  return resp
}

export default trans
