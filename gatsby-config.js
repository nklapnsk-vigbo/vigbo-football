module.exports = {
  siteMetadata: {
    title: `Vigbo Football Manager`,
    description: `Vigbo Football Manager`,
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
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/soccer.png`, // This path is relative to the root of the site.
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
