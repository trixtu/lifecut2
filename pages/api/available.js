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

  async function getProduct(handle) {
    const query = `
    {
      product(handle: "${handle}") {
        id
        variants(first: 25) {
          edges {
            node {
              id
              availableForSale
            }
          }
        }
      }
    }`

    const response = await ShopifyData(query)

    const product = response.data?.product ? response.data.product : []

    return product
  }

  const products = await getProduct(id)
  res.status(200)
  res.json(products)

  async function getCollections() {
    const query = `
    {
      collections(first: 10) {
        edges {
          node {
            handle
            products(first: 100) {
              edges {
                node {
                  handle
                  id
                }
              }
            }
          }
        }
      }
    }
    `

    const response = await ShopifyData(query)

    const collections = response.data ? response.data : []

    return collections
  }

  const collections = await getCollections()

  res.status(200)
  res.json(collections)
}
