import * as AWS from 'aws-sdk'
import { ICode } from '../interface'

const docClient = new AWS.DynamoDB.DocumentClient()

export const fetchData = (tableName: string) => {
	const params = {
		TableName: tableName,
	}

	docClient.scan(params, function (err, data) {
		if (err) {
			console.error('Error', err)
		} else {
			console.log('Success', data)
		}
	})
}

export const putData = (tableName: string, data: ICode) => {
	const params = {
		TableName: tableName,
		Item: data,
	}

	docClient.put(params, function (err, data) {
		if (err) {
			console.error('Error', err)
		} else {
			console.log('Success', data)
		}
	})
}

export const patchData = (tableName: string, data: ICode) => {
	const params = {
		TableName: tableName,
		Key: {
			id: data.id,
		},
		Item: data,
	}

	docClient.update(params, function (err, data) {
		if (err) {
			console.error('Error', err)
		} else {
			console.log('Success', data)
		}
	})
}

export const delData = (tableName: string, id: string) => {
	const params = {
		TableName: tableName,
		Key: {
			id,
		},
	}

	docClient.delete(params, function (err, data) {
		if (err) {
			console.error("Error", err);
		} else {
			console.log("Sucess", data);
		}
	})
}
