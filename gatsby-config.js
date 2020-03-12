module.exports = {
  siteMetadata: {
    title: `Sqvirbo Football Manager`,
    description: `Sqvirbo Football Manager`,
    author: `@vigbo`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `sqvirbo-football-manager`,
        short_name: `Sqvirbo Football Manager`,
        start_url: `/`,
        background_color: `#5327d2`,
        theme_color: `#5327d2`,
        display: `minimal-ui`,
        icon: `src/images/favicon.jpg`,
      },
    },
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: `3ced8ed95c44b565063919038b6b37`,
        previewMode: false,
        disableLiveReload: false,
        apiUrl: "https://site-api.datocms.com",
      },
    },
    `gatsby-plugin-offline`,
  ],
}
