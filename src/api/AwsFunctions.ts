import {
	ScanCommand,
	ScanCommandInput,
	PutItemCommand,
	PutItemCommandInput,
	UpdateItemCommand,
	UpdateItemCommandInput,
	DeleteItemCommand,
	DeleteItemCommandInput,
} from "@aws-sdk/client-dynamodb"
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb"

import { ICode } from '../interface'
import { client } from '../index'

export const fetchData = async (tableName: string): Promise<any> => {
	const params: ScanCommandInput = {
		TableName: tableName,
	}
	const command = new ScanCommand(params)

	return new Promise((resolve, reject) => {
		client.send(command)
			.then((data) => {
				const dataItem = data.Items.map(i => unmarshall(i))
				console.log('Success', dataItem)
				resolve(dataItem)
			})
			.catch((err) => {
				console.error('Error', err)
				reject([])
			})
	})
}

export const putData = async (tableName: string, data: ICode): Promise<any> => {
	const params: PutItemCommandInput = {
		TableName: tableName,
		Item: marshall({
			...data,
		}),
	}
	const command = new PutItemCommand(params)

	await client.send(command)
		.then((data) => {
			console.log('Success', data)
		})
		.catch((err) => {
			console.error('Error', err)
		})

	return fetchData(tableName)
}

export const patchData = async (tableName: string, data: ICode): Promise<any> => {
	const keys = Object.keys(data).filter(key => key !== 'id')
	const keyNameExpressions = keys.map(name => `#${name}`)
		.filter(nameExpr => nameExpr !== '#id')
	const keyValueExpressions = keys.map(value => `:${value}`)
		.filter(nameExpr => nameExpr !== ':id')
	const marshallData = marshall(data)

	const UpdateExpression = "set " + keyNameExpressions
		.map((nameExpr, idx) => `${nameExpr} = ${keyValueExpressions[idx]}`)
		.join(", ")
	const ExpressionAttributeNames = keyNameExpressions
		.reduce((exprs, nameExpr, idx) => ({ ...exprs, [nameExpr]: keys[idx] }), {})
	const ExpressionAttributeValues = keyValueExpressions
		.reduce((exprs, valueExpr, idx) => ({ ...exprs, [valueExpr]: marshallData[keys[idx]] }), {})

	const params: UpdateItemCommandInput = {
		TableName: tableName,
		Key: marshall({
			id: data.id,
		}),
		UpdateExpression,
		ExpressionAttributeNames,
		ExpressionAttributeValues,
	}

	const command = new UpdateItemCommand(params)

	await client.send(command)
		.then((data) => {
			console.log('Success', data)
		})
		.catch((err) => {
			console.error('Error', err)
		})

	return fetchData(tableName)
}

export const delData = async (tableName: string, data: ICode): Promise<any> => {
	const params: DeleteItemCommandInput = {
		TableName: tableName,
		Key: marshall({
			id: data.id,
		}),
	}

	const command = new DeleteItemCommand(params)

	await client.send(command)
		.then((data) => {
			console.log('Success', data)
		})
		.catch((err) => {
			console.error('Error', err)
		})

	return fetchData(tableName)
}
