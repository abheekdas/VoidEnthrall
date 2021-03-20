import { getDefaultNormalizer } from '@testing-library/dom';
import Localbase from 'localbase';
import MedicineData from '../medicineData';
let db = new Localbase("db");

export function insertData(callback){
    MedicineData.forEach((topic,index) => {
        db.collection("UserArchive").add(topic, topic.Date);
    });
        getDefaultNormalizer(callback);
}

export function getData(callback) {
	db.collection("UserArchive")
		.get()
		.then((data) => {
			if (data.length === 0) {
				insertData(callback);
			} else {
				return callback(
					data.sort((a, b) => {
						return a.position - b.position;
					})
				);
			}
		});
}

export function getTopicData(key, callback) {
	db.collection("UserArchive")
		.doc(key)
		.get()
		.then((document) => {
			callback(document);
		});
}

export function updateDBData(key, updateData) {
	db.collection("UserArchive").doc(key).update(updateData);
}

export function resetDBData(callback) {
	db.collection("UserArchive")
		.delete()
		.then((response) => {
			callback(response);
		})
		.catch((error) => {
			console.log("There was an error, do something else");
		});
}
