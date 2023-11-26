export default async function send(req, res) {
  const {
    query: { id },
  } = req

  const domain = process.env.SHOPIFY_STORE_DOMAIN
  const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

  async function ShopifyData(query) {
    const URL = `https://${domain}/api/2022-10/graphql.json`

    const options = {
      endpoint: URL,
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    }

    try {
      const data = await fetch(URL, options).then((response) => {
        return response.json()
      })

      return data
    } catch (error) {
      throw new Error('Products not fetched')
    }
  }

  async function getAllZaunserie() {
    const query = `
        {
          metaobjects(type: "zaunserie", first: 100) {
            edges {
              node {
                handle
                fields {
                  value
                  key
                  reference {
                    ... on Collection {
                      id
                      handle
                      title
                      products(first: 100) {
                        edges {
                          node {
                            handle
                            id
                            tags
                            pfosten: metafield(namespace: "custom", key: "pfoste") {
                              reference {
                                ... on Product {
                                  id
                                  handle 
                                  images(first: 10) {
                                    nodes {
                                      src
                                      url
                                    }
                                  }
                                  options(first: 10) {
                                    name
                                    values
                                  }
                                  variants(first: 10) {
                                    edges {
                                      node {
                                        priceV2 {
                                          amount
                                          currencyCode
                                        }
                                        compareAtPriceV2 {
                                          amount
                                          currencyCode
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                            pfosten_2: metafield(namespace: "custom", key: "poste_2") {
                              key
                              id
                              references(first: 10) {
                                edges {
                                  node {
                                    ... on Product {
                                      id
                                      title
                                      tags
                                      images(first: 10) {
                                        edges {
                                          node {
                                            src
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                             
                            }
                            images(first: 10) {
                              nodes {
                                src
                                url
                              }
                            }
                            options(first: 10) {
                              name
                              values
                            }
                            variants(first: 10) {
                              edges {
                                node {
                                  priceV2 {
                                    amount
                                    currencyCode
                                  }
                                  compareAtPriceV2 {
                                    amount
                                    currencyCode
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    ... on MediaImage {
                      image {
                        url
                      } 
                    }
                    ... on Metaobject {
                      handle
                      fields {
                        value
                        type
                        key
                        references(first: 20) {
                            edges {
                              node {
                                ... on Product {
                                  id
                                  title
                                  tags
                                  images(first: 10) {
                                    edges {
                                      node {
                                        src
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                      }
                    }
                  }
                  type
                }
                
              }
            }
          }
        }
        `

    const response = await ShopifyData(query)

    const zaunserie = response.data ? response.data : []

    return zaunserie
  }

  const zaunseries = await getAllZaunserie()

  res.status(200)
  res.json(zaunseries)
}
