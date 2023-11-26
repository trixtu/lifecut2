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

export async function getMainMenu() {
  const query = `
  {
    menu(handle: "main-menu") {
      handle
      title
      itemsCount
      items {
        id
        title
        url
        type
        tags
        resourceId
      }
    }
  }
  `

  const response = await ShopifyData(query)

  const menus = response.data ? response.data : []

  return menus
}

export async function getAllCollections() {
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
export async function getAllZaunserie() {
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
                      title
                      tags
                      pfosten: metafield(namespace: "custom", key: "pfoste") {
                        reference {
                          ... on Product {
                            id
                            tags
                            title
                            handle 
                            images(first: 10) {
                              edges {
                                node {
                                  src
                                  url
                                }
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
                  references(first: 20) {
                      edges {
                        node {
                          ... on Product {
                            id
                            title
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

  const collections = response.data ? response.data : []

  return collections
}

export async function getAllSubcategory() {
  const query = `
  {
    metaobjects(type: "subcategory", first: 100) {
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
            }
            type
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

export async function getProductsInCollection() {
  const query = `
  {
    collection(handle: "frontpage") {
      title
      products(first: 25) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)

  const allProducts = response.data.collection.products.edges
    ? response.data.collection.products.edges
    : []

  return allProducts
}

export async function getAllProducts() {
  const query = `{
    products(first: 250, ) {  
      edges {
        node {
          
          handle
          title
          id
          vendor
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          collections(first: 10) {
            edges {
              node {
                title
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                title
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          availableForSale
          description
          productType
          totalInventory
        }
      }
    }
  }`

  const response = await ShopifyData(query)

  const slugs = response.data?.products.edges
    ? response.data.products.edges
    : []

  return slugs
}

export async function getProduct(handle) {
  const query = `
  {
    product(handle: "${handle}") {
    	collections(first: 1) {
      	edges {
          node {
            products(first: 5) {
              edges {
                node {
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  handle
                  title
                  id
                  images(first: 5) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
    	}
      id
      title
      handle
      description
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 25) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
            title
            id
            availableForSale
            priceV2 {
              amount
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)

  const product = response.data.product ? response.data.product : []

  return product
}

export async function createCheckout(id, quantity) {
  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [{ variantId: "${id}", quantity: ${quantity}}]
      }) {
        checkout {
          id
          webUrl
        }
      }
    }`

  const response = await ShopifyData(query)

  const checkout = response.data.checkoutCreate.checkout
    ? response.data.checkoutCreate.checkout
    : []

  return checkout
}

export async function updateCheckout(id, lineItems) {
  const lineItemsObject = lineItems.map((item) => {
    return `{
      variantId: "${item.id}",
      quantity:  ${item.variantQuantity}
    }`
  })

  const query = `
  mutation {
    checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
      checkout {
        id
        webUrl
        lineItems(first: 25) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)

  const checkout = response.data.checkoutLineItemsReplace.checkout
    ? response.data.checkoutLineItemsReplace.checkout
    : []

  return checkout
}

export async function recursiveCatalog(cursor = '', initialRequest = true) {
  let data

  if (cursor !== '') {
    const query = `{
      products(after: "${cursor}", first: 250) {
        edges {
          cursor
          node {
            id
            handle
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }`

    const response = await ShopifyData(query)
    data = response.data.products.edges ? response.data.products.edges : []

    if (response.data.products.pageInfo.hasNextPage) {
      const num = response.data.products.edges.length
      const cursor = response.data.products.edges[num - 1].cursor
      console.log('Cursor: ', cursor)

      return data.concat(await recursiveCatalog(cursor))
    } else {
      return data
    }
  } else {
    const query = `{
      products(first: 250) {
        edges {
          cursor
          node {
            id
            handle
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
    `

    const response = await ShopifyData(query)
    data = response.data.products.edges ? response.data.products.edges : []

    if (response.data.products.pageInfo.hasNextPage) {
      const num = response.data.products.edges.length
      const cursor = response.data.products.edges[num - 1].cursor

      return data.concat(await recursiveCatalog(cursor))
    } else {
      return data
    }
  }
}
