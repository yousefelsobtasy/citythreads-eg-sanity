import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import schemas from './sanity/schemas/index'

const config = defineConfig({
    projectId: 'd3jjeys1',
    dataset: 'production',
    titel: 'admin panal',
    apiVersion: '2025-03-05',
    basePath: '/admin',
    plugins: [
        deskTool()
    ],
    schema: { types: schemas }
})

export default config