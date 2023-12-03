const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

const createCheckout2 = async (lineItems) => {
  const lineItemsObject = lineItems.map((item) => {
    return `{
      variantId: "${item.id}",
      quantity:  ${item.variantQuantity}
    }`
  })

  const checkoutMutation = `
    mutation {
      
        checkoutCreate(input: {
        lineItems: [${lineItemsObject}]
        }) {
          checkout {
              id
              webUrl
              lineItems(first: 100) {
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
  const URL = `https://${domain}/api/2022-10/graphql.json`

  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: checkoutMutation }),
  })

  try {
    const result = await response.text()
    const jsonResponse = result ? JSON.parse(result) : null

    console.log(
      'Cerere către Shopify:',
      `/api/create-checkout?productId=${id}&quantity=${quantity}`
    )

    console.log('Răspuns de la server:', result)

    if (jsonResponse && jsonResponse.errors) {
      throw new Error(jsonResponse.errors[0].message)
    }

    return jsonResponse.data.checkoutCreate.checkout
  } catch (error) {
    console.error('Eroare la parsarea răspunsului JSON:', error)

    try {
      if (result) {
        console.error('Răspuns nevalid JSON:', result)
      }
    } catch (nestedError) {
      console.error(
        'Eroare la manipularea răspunsului JSON nevalid:',
        nestedError
      )
    }

    console.error('A apărut o eroare la crearea checkout-ului:', error)
    // Aici puteți arunca o excepție personalizată sau trata eroarea în alt mod, dacă este cazul
  }
}

export { createCheckout2 }
