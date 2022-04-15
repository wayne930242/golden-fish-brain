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

import { ICode } from '../interface'
import { client } from '../index'

export const fetchData = async (tableName: string): Promise<any> => {
	const params: ScanCommandInput = {
		TableName: tableName,
	}
	const command = new ScanCommand(params)

	return new Promise((resolve, reject) => {
		return client.send(command)
			.then((data) => {
				console.log('Success', data)
				resolve(data.Items)
			})
			.catch((err) => {
				console.error('Error', err)
				reject([])
			})
	})
}

export const putData = (tableName: string, data: any): Promise<any> => {
	const params: PutItemCommandInput = {
		TableName: tableName,
		Item: data,
	}
	const command = new PutItemCommand(params)

	return new Promise((resolve, reject) => {
		return client.send(command)
			.then((data) => {
				console.log('Success', data)
				resolve([])
			})
			.catch((err) => {
				console.error('Error', err)
				reject([])
			})
	})
}

export const patchData = (tableName: string, data: any): Promise<any> => {
	const params: UpdateItemCommandInput = {
		TableName: tableName,
		Key: {
			id: data.id,
		},
		AttributeUpdates: data,
	}

	const command = new UpdateItemCommand(params)

	return new Promise((resolve, reject) => {
		return client.send(command)
			.then((data) => {
				console.log('Success', data)
				resolve([])
			})
			.catch((err) => {
				console.error('Error', err)
				reject([])
			})
	})
}

export const delData = (tableName: string, id: any): Promise<any> => {
	const params: DeleteItemCommandInput = {
		TableName: tableName,
		Key: {
			id,
		},
	}

	const command = new DeleteItemCommand(params)

	return new Promise((resolve, reject) => {
		return client.send(command)
			.then((data) => {
				console.log('Success', data)
				resolve([])
			})
			.catch((err) => {
				console.error('Error', err)
				reject([])
			})
	})
}
