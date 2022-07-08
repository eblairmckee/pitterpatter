          ___                       ___           ___           ___           ___       
        /\  \          ___        /\  \         /\  \         /\  \         /\  \      
        /::\  \        /\  \       \:\  \        \:\  \       /::\  \       /::\  \     
      /:/\:\  \       \:\  \       \:\  \        \:\  \     /:/\:\  \     /:/\:\  \    
      /::\~\:\  \      /::\__\      /::\  \       /::\  \   /::\~\:\  \   /::\~\:\  \   
    /:/\:\ \:\__\  __/:/\/__/     /:/\:\__\     /:/\:\__\ /:/\:\ \:\__\ /:/\:\ \:\__\  
    \/__\:\/:/  / /\/:/  /       /:/  \/__/    /:/  \/__/ \:\~\:\ \/__/ \/_|::\/:/  /  
          \::/  /  \::/__/       /:/  /        /:/  /       \:\ \:\__\      |:|::/  /   
          \/__/    \:\__\       \/__/         \/__/         \:\ \/__/      |:|\/__/    
                    \/__/                                    \:\__\        |:|  |      
                                                              \/__/         \|__|      
          ___           ___           ___           ___           ___           ___     
        /\  \         /\  \         /\  \         /\  \         /\  \         /\  \    
        /::\  \       /::\  \        \:\  \        \:\  \       /::\  \       /::\  \   
      /:/\:\  \     /:/\:\  \        \:\  \        \:\  \     /:/\:\  \     /:/\:\  \  
      /::\~\:\  \   /::\~\:\  \       /::\  \       /::\  \   /::\~\:\  \   /::\~\:\  \ 
    /:/\:\ \:\__\ /:/\:\ \:\__\     /:/\:\__\     /:/\:\__\ /:/\:\ \:\__\ /:/\:\ \:\__\
    \/__\:\/:/  / \/__\:\/:/  /    /:/  \/__/    /:/  \/__/ \:\~\:\ \/__/ \/_|::\/:/  /
          \::/  /       \::/  /    /:/  /        /:/  /       \:\ \:\__\      |:|::/  / 
          \/__/        /:/  /     \/__/         \/__/         \:\ \/__/      |:|\/__/  
                      /:/  /                                   \:\__\        |:|  |    
                      \/__/                                     \/__/         \|__|   


👋🏼 I made this project because I like to study while walking my dogs, but the repo can also be repurposed to create study guides for anything! 

If you want to use this repo as a study guide front end eng interview questions and CS concepts, [it's deployed here](https://pitterpatter.vercel.app/). 

Otherwise, if you want to use this as a template to BYO study guides, make sure you follow the directions below _exactly_. This entire project relies on strong types and codegen, one mistake and it won't work. 

> Let's get at 'er
## Stack

-   [Next.js](https://nextjs.org/) bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
-   TypeScript
-   [GraphCMS](https://graphcms.com/) backend (headless CMS)
-   [GraphQL](https://graphql.org/)
-   [Linaria](https://github.com/callstack/linaria#setup)

This repo is also a great boilerplate project for GraphCMS projects that use TypeScript (none of which I could find myself). If you want to follow step-by-step how I set this repo up check out ✍🏼 [this blog post](https://dev.to/theblairwitch/generate-types-for-your-graphql-schemas-in-5-minutes-5a16). 

## How to BYO Study Guide

### GraphCMS

You'll want to setup a [GraphCMS](https://graphcms.com/) account and project. They do have a free tier for personal projects. 

You can [clone my GraphCMS project](https://app.graphcms.com/clone/687bc4345c634cc983c4fd6a01c2877e?name=PitterPatter) as a template or start your own from scratch. 

Create a "Questions" Schema and add the following required fields:

-   Prompt (string)
-   Answer (rich text)
-   Tags (you'll need to create an enum and then pass that to a Dropdown)

For TypeScript's sake, you will need to enter the schema exactly as I have it above. 

Create some questions using the schema, publish, and then make sure you can run the following query in the playground:

```graphql
query MyQuery {
  questions {
    prompt
    tags
    id
    answer {
      html
    }
  }
}
```

After you've created the Tags enum, add some tags to your questions. Then go ahead and try this query in the playground:

```graphql
query MyQuery($tags: [Tag!]) {
  questions(where: {tags_contains_some: $tags}) {
    prompt
    tags
    id
    answer {
      html
    }
  }
}
```

And add one of the tags you just created to the Query Variables footer.

If everything works, you can go ahead and start ingesting the data in this repo!

### This Repo

Run `yarn install` to get your dependencies setup.

Grab your API key and authentication headers from GraphCMS and add them to both the `graphql.config.js` and `codegen.yaml` files.

#### graphql.config.js
```js
module.exports = {
	schema: {
		<YOUR_SCHEMA_URL_HERE>:
			{
				headers: {
					Authorization:
						<YOUR_AUTH_CODE_HERE>
				},
			},
	},
};
```

#### codegen.yaml
```yaml
schema: <YOUR_SCHEMA_URL_HERE>
documents: './src/queries/*.graphql'
generates:
    graphql/generated.ts:
        plugins:
            - typescript
            - typescript-operations
```

Run `yarn codegen` to generate TypeScript types from your schema. Check `/graphql/generated.ts` and make sure your types are there.

Go ahead and run `yarn dev` if you want hot reloading, otherwise `yarn build` and then `yarn start` for a more SSR experience.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
