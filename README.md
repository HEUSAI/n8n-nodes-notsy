# n8n-nodes-notsy

This is an n8n community node. It lets you use [Notsy Facturación](https://facturacion.notsy.com.mx)
in your n8n workflows.

**Notsy** is a Mexican e-invoicing service: it issues official **CFDI 4.0** invoices and resolves
**SAT** catalog keys from natural-language descriptions, using your Notsy API key.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow
automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in
the n8n community nodes documentation.

In n8n (self-hosted): **Settings → Community Nodes → Install** → `n8n-nodes-notsy`.

## Operations

- **Resolve SAT Keys** — turn a natural-language description into `clave_prodserv`, `clave_unidad`,
  `uso_cfdi`, and more.
- **Preview Invoice** — validate and calculate totals without stamping or cost (dry run).
- **Issue CFDI** — issue and stamp an official CFDI 4.0 with the SAT.
- **My Account** — view the permissions, limits and usage of your API key.

## Credentials

Create a **Notsy API** credential with your **API key** (format `ntsy_...`), which you generate in
your business dashboard at https://facturacion.notsy.com.mx (section "Connect your AI agent").

## Compatibility

Tested against n8n 1.x. Requires Node.js 20.15 or later.

## Usage

Notsy can also be used from n8n via its **MCP server** (`https://mcp.notsy.com.mx/mcp`) with the
*MCP Client Tool* node, using the same API key as the header `Authorization: Bearer ntsy_...`.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Notsy developer docs](https://facturacion.notsy.com.mx/developers)
- [Notsy OpenAPI spec](https://facturacion.notsy.com.mx/openapi.json)

## License

[MIT](LICENSE.md)
