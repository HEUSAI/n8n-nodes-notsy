import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Notsy implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Notsy',
		name: 'notsy',
		icon: 'file:notsy.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Issue Mexican CFDI 4.0 invoices and resolve SAT catalog keys',
		defaults: { name: 'Notsy' },
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'notsyApi', required: true }],
		requestDefaults: {
			baseURL: 'https://facturacion-api.notsy.com.mx',
			headers: { 'Content-Type': 'application/json' },
		},
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Resolve SAT Keys',
						value: 'resolver',
						action: 'Resolve SAT catalog keys from a description',
						description: 'Turn a description into clave_prodserv, clave_unidad and more',
						routing: { request: { method: 'POST', url: '/agent/resolver-claves-sat' } },
					},
					{
						name: 'Preview Invoice',
						value: 'preview',
						action: 'Preview an invoice without stamping it',
						description: 'Validate and calculate totals at no cost, before issuing',
						routing: { request: { method: 'POST', url: '/agent/facturas/preview' } },
					},
					{
						name: 'Issue CFDI',
						value: 'emitir',
						action: 'Issue and stamp a tax invoice',
						description: 'Stamp an official CFDI 4.0 with the Mexican tax authority (SAT)',
						routing: { request: { method: 'POST', url: '/agent/facturas' } },
					},
					{
						name: 'My Account',
						value: 'whoami',
						action: 'View the API key permissions limits and usage',
						description: 'Return the permissions, limits and usage of the API key',
						routing: { request: { method: 'GET', url: '/agent/whoami' } },
					},
				],
				default: 'resolver',
			},

			// ── Resolve SAT Keys ──
			{
				displayName: 'Description',
				name: 'descripcion',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'marketing consulting',
				description: 'What you sell, in natural language',
				displayOptions: { show: { operation: ['resolver'] } },
				routing: { send: { type: 'body', property: 'descripcion' } },
			},
			{
				displayName: 'Apply VAT',
				name: 'con_iva',
				type: 'boolean',
				default: true,
				description: 'Whether the item is subject to VAT (IVA)',
				displayOptions: { show: { operation: ['resolver'] } },
				routing: { send: { type: 'body', property: 'con_iva' } },
			},

			// ── Preview / Issue ──
			{
				displayName: 'Line Items (JSON)',
				name: 'conceptos',
				type: 'json',
				default: '[\n  {\n    "descripcion": "Consultoria",\n    "clave_prodserv": "80101500",\n    "clave_unidad": "E48",\n    "cantidad": 1,\n    "valor_unitario": 1000,\n    "precio_incluye_iva": false\n  }\n]',
				required: true,
				description: 'List of CFDI line items (conceptos)',
				displayOptions: { show: { operation: ['preview', 'emitir'] } },
				routing: { send: { type: 'body', property: 'conceptos' } },
			},
			{
				displayName: 'Customer (JSON)',
				name: 'cliente',
				type: 'json',
				default: '{\n  "rfc": "",\n  "nombre": "",\n  "regimen_fiscal": "",\n  "cp": "",\n  "uso_cfdi": "G03"\n}',
				description: 'CFDI recipient, or pass cliente_id of a saved customer',
				displayOptions: { show: { operation: ['preview', 'emitir'] } },
				routing: { send: { type: 'body', property: 'cliente' } },
			},
			{
				displayName: 'Payment Method',
				name: 'metodo_pago',
				type: 'options',
				options: [
					{ name: 'PUE - Paid in a Single Payment', value: 'PUE' },
					{ name: 'PPD - Paid in Installments (Credit)', value: 'PPD' },
				],
				default: 'PUE',
				description: 'SAT payment method (metodo de pago)',
				displayOptions: { show: { operation: ['preview', 'emitir'] } },
				routing: { send: { type: 'body', property: 'metodo_pago' } },
			},
			{
				displayName: 'Payment Form (SAT Code)',
				name: 'forma_pago',
				type: 'string',
				default: '03',
				description: 'SAT payment form code: 03 transfer, 01 cash, 04 credit card, etc',
				displayOptions: { show: { operation: ['preview', 'emitir'] } },
				routing: { send: { type: 'body', property: 'forma_pago' } },
			},
		],
	};
}
