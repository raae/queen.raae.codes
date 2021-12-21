Subject:

Ship Ahoy Skill Builder!

## My Skill Building Session:
![data-relationships](data-relationships-1-w51-2021.png)


## What did I do?

Create data relationships between TAGS and Lillian's photos of projects.

## Why did I do it?

To make it easier for Lillian to ship her projects to friends.

## How did I do it?

**The Plan**

S. See: `toppings` are not on `pizzas` in GraphQL
A. Array: Add `array` to pizza.js in Sanity

N. Nodes: `toppings` are now on `pizzas` in GraphQL

Look at these steps later:

I. Into my webapp with GraphQL

T. Treasure:
Y. Yeah: ahoyTopping can be linked to in my webapp after copy/pasting some Wes Bos wizardry.



## The Steps

### S. See: `toppings` are not on `pizzas` in GraphQL or in GraphiQL

```js
// Rubys-TimeShip/src/components/ToppingsFilter.js
//              How do I  Get a list of all the pizzas with their toppings?
//              3. Pizzas-data-tree-🌲 in Sanity
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {

          // 👁️ Look no `toppings` here 👀

          id
          }
          slug {
            current
          }
        }
      }
    }
  `);


```

### A. Array: Add `array` to pizza.js in Sanity

I added this code to my pizza.js. in Sanity

```js
// schemas/pizza.js
    {
      name: 'toppings',
      title: 'Toppings and Tools and Tags of Pirate Princess Lillian (6 🏴‍☠️👸)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
```

### N. Nodes: `toppings` are now on `pizzas` in GraphQL

I looked in my GraphiQL and copy/pasted the new query into ToppingsFilter.js

```js
// Rubys-TimeShip/src/components/ToppingsFilter.js
  // How do I  Get a list of all the Pizzas with their toppings
//              3. bakingSupplies: toppings-data-🌲 in Sanity
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
          slug {
            current
          }
          id
        }
      }
    }
  `);
```

And that is enough steps for this week, if you want to see Pirate Princess Lillian go and look at my skill building session on youtube. This link starts you 20 minutes into the video, where I show you how the webapp will look in the end.

[I Create Data Relationships ⛵ inside Sanity.io and show them in my Gatsby webapp 🏴‍☠️ OlaCast, 20 minutes in](https://youtu.be/ix_0vrwQnWk?t=1200)

If you feel like doing me a favour you can give me a smiley emoji comment to feed my youtube algos some vitamins.

💪😺👍

Keep your skill-building-submarine afloat this week!
🔧⛵🏴‍☠️

Cap'n Ola Vea

P.S.

Links:
[https://timeship1.gatsbyjs.io/pizzas/](https://timeship1.gatsbyjs.io/pizzas/)
[I Create Data Relationships ⛵ inside Sanity.io and show them in my Gatsby webapp 🏴‍☠️ OlaCast, 20 minutes in](https://youtu.be/ix_0vrwQnWk?t=1200)

