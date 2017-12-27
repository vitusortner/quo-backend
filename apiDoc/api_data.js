define({ "api": [
  {
    "type": "delete",
    "url": "/components/:id",
    "title": "Delete a component",
    "name": "DeleteComponent",
    "version": "0.1.0",
    "group": "Component",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the component.</p>"
          }
        ]
      }
    },
    "filename": "routes/components.js",
    "groupTitle": "Component"
  },
  {
    "type": "get",
    "url": "/components/:id",
    "title": "Get a component",
    "name": "GetComponent",
    "version": "0.1.0",
    "group": "Component",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the component.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"_id\": \"12345\",\n        \"updatedAt\": \"yyyy-MM-dd'T'HH:mm:ss'Z\",\n        \"timestamp\": \"yyyy-MM-dd'T'HH:mm:ss'Z\",\n        \"type\": \"Text\",\n        \"position\": 1,\n        \"__v\": 0,\n        \"picture\": \"www.s3.com\",\n        \"text\": \"Example Text\"\n },",
          "type": "json"
        }
      ]
    },
    "filename": "routes/components.js",
    "groupTitle": "Component"
  },
  {
    "type": "put",
    "url": "/components/:id",
    "title": "Modify a component",
    "name": "PutComponent",
    "version": "0.1.0",
    "group": "Component",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the component</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "position",
            "description": "<p>Position of the component.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "text",
            "defaultValue": "null",
            "description": "<p>Components can have text OR picture.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "picture",
            "defaultValue": "null",
            "description": "<p>Components can have text OR picture.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n          \"_id\":\"876543\",\n          \"position\":\"1\",\n          \"text\":\"Example Text\",\n          \"picture\":\"www.s3.com\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "component",
            "description": "<p>Component object that was created and added to the place.</p>"
          }
        ]
      }
    },
    "filename": "routes/components.js",
    "groupTitle": "Component"
  },
  {
    "type": "delete",
    "url": "/pictures/:id",
    "title": "Delete a picture",
    "name": "DeletePicture",
    "version": "0.1.0",
    "group": "Picture",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the picture.</p>"
          }
        ]
      }
    },
    "filename": "routes/pictures.js",
    "groupTitle": "Picture"
  },
  {
    "type": "get",
    "url": "/pictures/:id",
    "title": "Get a picture",
    "name": "GetPicture",
    "version": "0.1.0",
    "group": "Picture",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the picture.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"_id\": \"123456\",\n      \"updatedAt\": \"yyyy-MM-dd'T'HH:mm:ss'Z\",\n      \"timestamp\": \"yyyy-MM-dd'T'HH:mm:ss'Z\",\n      \"src\": \"www.s3.com\",\n      \"owner\": \"987655\",\n      \"place\": \"234567\",\n      \"__v\": 0,\n      \"is_visible\": true\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/pictures.js",
    "groupTitle": "Picture"
  },
  {
    "type": "put",
    "url": "/pictures/:id",
    "title": "Modify a picture",
    "name": "PutPicture",
    "version": "0.1.0",
    "group": "Picture",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the picture.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "src",
            "description": "<p>URL to the file.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "place",
            "description": "<p>ID of the place the picture is in.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "owner",
            "description": "<p>ID of the user who is owner.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "is_visible",
            "defaultValue": "true",
            "description": "<p>Is the place visible.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     \"_id\":\"98765\",\n     \"src\":\"quo1234\",\n     \"place\":\"12345\",\n     \"owner\":\"54321\",\n     \"is_visible\":true\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "picture",
            "description": "<p>Modified picture Object.</p>"
          }
        ]
      }
    },
    "filename": "routes/pictures.js",
    "groupTitle": "Picture"
  },
  {
    "type": "delete",
    "url": "/places/:id",
    "title": "Delete a place",
    "name": "DeletePlace",
    "version": "0.1.0",
    "group": "Place",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID of the place you want to delete</p>"
          }
        ]
      }
    },
    "filename": "routes/places.js",
    "groupTitle": "Place"
  },
  {
    "type": "get",
    "url": "/places/:id",
    "title": "Get a single place",
    "name": "GetPlace",
    "version": "0.1.0",
    "group": "Place",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique Place-ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"12345\",\n  \"updatedAt\": \"yyyy-MM-dd'T'HH:mm:ss'Z\",\n  \"timestamp\": \"yyyy-MM-dd'T'HH:mm:ss'Z\",\n  \"host\": \"87654\",\n  \"title\": \"Example Place\",\n  \"lat\": 42,\n  \"long\": 42,\n  \"qr_code_id\": \"378fz38rvh38rg\",\n  \"qr_code\": \"www.s3.com\"\n  \"title_picture\": \"www.s3.com\",\n  \"description\": \"Schockt\",\n  \"__v\": 0,\n  \"settings\": {\n      \"has_to_validate_gps\": true,\n      \"is_photo_upload_allowed\": true\n  },\n  \"pictures\": [],\n  \"components\": [],\n  \"start\": \"yyyy-MM-dd'T'HH:mm:ss'Z\",\n  \"end\": \"yyyy-MM-dd'T'HH:mm:ss'Z\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/places.js",
    "groupTitle": "Place"
  },
  {
    "type": "get",
    "url": "/places/:id/components",
    "title": "Get all component objects",
    "name": "GetPlaceComponents",
    "version": "0.1.0",
    "group": "Place",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID of the place</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "components",
            "description": "<p>List of all components objects the place contains.</p>"
          }
        ]
      }
    },
    "filename": "routes/places.js",
    "groupTitle": "Place"
  },
  {
    "type": "get",
    "url": "/places/:id/pictures",
    "title": "Get all picture objects",
    "name": "GetPlacePictures",
    "version": "0.1.0",
    "group": "Place",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID of the place</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Pictures",
            "description": "<p>List of all picture objects the place contains.</p>"
          }
        ]
      }
    },
    "filename": "routes/places.js",
    "groupTitle": "Place"
  },
  {
    "type": "get",
    "url": "/places/:qr_code_id/:user_id",
    "title": "Get the place with the QR Code",
    "name": "GetPlaceQRcode",
    "version": "0.1.0",
    "group": "Place",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "qr_code_id",
            "description": "<p>ID the QR Code contains</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID of the user who scans the QR Code</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Place",
            "description": "<p>The requested place object</p>"
          }
        ]
      }
    },
    "filename": "routes/places.js",
    "groupTitle": "Place"
  },
  {
    "type": "get",
    "url": "/places",
    "title": "Request all Place information's",
    "name": "GetPlaces",
    "version": "0.1.0",
    "group": "Place",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "places",
            "description": "<p>List of all place Objects.</p>"
          }
        ]
      }
    },
    "filename": "routes/places.js",
    "groupTitle": "Place"
  },
  {
    "type": "post",
    "url": "/places",
    "title": "Create a new place",
    "name": "PostPlace",
    "version": "0.1.0",
    "group": "Place",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Required title of the place.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title_picture",
            "description": "<p>URL to the file.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Short description.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "start",
            "defaultValue": "Now",
            "description": "<p>Optional start date.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "end",
            "description": "<p>Optional end date.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lat",
            "description": "<p>Required latitude value.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "long",
            "description": "<p>Required longitude value.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "address",
            "description": "<p>Optional address object.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address.street",
            "description": "<p>Optional address Street.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address.city",
            "description": "<p>Optional address city.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "address.zip_code",
            "description": "<p>Optional address zip code.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "host",
            "description": "<p>ID of the user who is host.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "qr_code_id",
            "description": "<p>ID that is saved in QR Code.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "qr_code",
            "description": "<p>URL to the file.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": true,
            "field": "components",
            "description": "<p>ID's from components the place contains</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": true,
            "field": "pictures",
            "description": "<p>ID's from pictures the place contains</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "settings",
            "description": "<p>Optional settings object</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "settings.is_photo_upload_allowd",
            "defaultValue": "true",
            "description": "<p>Are users allowed to upload images to the place gallery.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "settings.has_to_validate_gps",
            "defaultValue": "true",
            "description": "<p>Are users required to be at the geological location of the place.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n          \"title\":\"Example Place\",\n          \"title_picture\":\"www.s3.com\",\n          \"description\":\"A example place description\"\n          \"start\":\"yyyy-MM-dd'T'HH:mm:ss'Z\",\n          \"end\":\"yyyy-MM-dd'T'HH:mm:ss'Z\",\n          \"lat\":1234,\n          \"long\":4321,\n          \"address\":{\n              \"street\":\"Example Street 42\",\n              \"city\":\"Examplecity\",\n              \"zip-code\":\"12345\"\n          },\n          \"host\":\"12345\",\n          \"qr_code_id\":\"9A8B7C6D5F\",\n          \"qr_code\":\"www.s3.com\",\n          \"components\":[\"1a2b3c4d5e6f7g8h9i10j11k\"],\n          \"pictures\":[\"1a2b3c4d5e6f7g8h9i10j11k\"],\n          \"settings\":{\n              \"is_photo_upload_allowed\":true,\n              \"has_to_validate_gps\":true\n          }\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "place",
            "description": "<p>Place object that was created.</p>"
          }
        ]
      }
    },
    "filename": "routes/places.js",
    "groupTitle": "Place"
  },
  {
    "type": "post",
    "url": "/places/:id/components",
    "title": "Create a new component",
    "name": "PostPlaceComponent",
    "version": "0.1.0",
    "group": "Place",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "position",
            "description": "<p>Position of the component.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "text",
            "defaultValue": "null",
            "description": "<p>Components can have text OR picture.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "picture",
            "defaultValue": "null",
            "description": "<p>Components can have text OR picture.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n          \"position\":\"1\",\n          \"text\":\"Example Text\",\n          \"picture\":\"www.s3.com\",\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "component",
            "description": "<p>Component object that was created and added to the place.</p>"
          }
        ]
      }
    },
    "filename": "routes/places.js",
    "groupTitle": "Place"
  },
  {
    "type": "post",
    "url": "/places/:id/pictures",
    "title": "Create a new picture",
    "name": "PostPlacePicture",
    "version": "0.1.0",
    "group": "Place",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "src",
            "description": "<p>URL to the file.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "place",
            "description": "<p>ID of the place.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "owner",
            "description": "<p>ID of the user who is owner.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "is_visible",
            "defaultValue": "true",
            "description": "<p>Is the place visible.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     \"src\":\"www.s3.com\",\n     \"place\":\"12345\",\n     \"owner\":\"54321\",\n     \"is_visible\":true\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "picture",
            "description": "<p>Picture object that was created and added to the place.</p>"
          }
        ]
      }
    },
    "filename": "routes/places.js",
    "groupTitle": "Place"
  },
  {
    "type": "put",
    "url": "/places/:id",
    "title": "Modifiy a place",
    "name": "PutPlace",
    "version": "0.1.0",
    "group": "Place",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the place you want to modifiy.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Required title of the Place.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title_picture",
            "description": "<p>URL to the file.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Short description.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "start",
            "defaultValue": "Now",
            "description": "<p>Optional start date.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "end",
            "description": "<p>Optional end date.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "lat",
            "description": "<p>Required latitude value.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "long",
            "description": "<p>Required longitude value.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "address",
            "description": "<p>Optional address object.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address.street",
            "description": "<p>Optional address Street.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address.city",
            "description": "<p>Optional address city.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "address.zip_code",
            "description": "<p>Optional address zip code.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "host",
            "description": "<p>ID of the user who is host.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "qr_code_id",
            "description": "<p>ID that is saved in QR Code.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "qr_code",
            "description": "<p>URL to the file.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": true,
            "field": "components",
            "description": "<p>ID's from Components the place contains</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": true,
            "field": "pictures",
            "description": "<p>ID's from pictures the place contains</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "settings",
            "description": "<p>Optional settings object</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "settings.is_photo_upload_allowd",
            "defaultValue": "true",
            "description": "<p>Are users allowed to upload images to the place gallery.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "settings.has_to_validate_gps",
            "defaultValue": "true",
            "description": "<p>Are users required to be at the geological location of the place.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n          \"_id\":\"12345\",\n          \"title\":\"Other Place\",\n          \"title_picture\":\"www.s3.com\",\n          \"description\":\"Other description\",\n          \"start\":\"yyyy-MM-dd'T'HH:mm:ss'Z\",\n          \"end\":\"yyyy-MM-dd'T'HH:mm:ss'Z\",\n          \"lat\":4321,\n          \"long\":1234,\n          \"address\":{\n              \"street\":\"Other Street 42\",\n              \"city\":\"Othercity\",\n              \"zip-code\":\"54321\"\n          },\n          \"host\":\"54321\",\n          \"qr_code_id\":\"9A8B7C6D5F\",\n          \"qr_code\":\"www.s3.com\",\n          \"components\":[\"1a2b3c4d5e6f7g8h9i10j11k\"],\n          \"pictures\":[\"1a2b3c4d5e6f7g8h9i10j11k\"],\n          \"settings\":{\n              \"is_photo_upload_allowed\":true,\n              \"has_to_validate_gps\":true\n          }\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "place",
            "description": "<p>Place object that was changed.</p>"
          }
        ]
      }
    },
    "filename": "routes/places.js",
    "groupTitle": "Place"
  },
  {
    "type": "get",
    "url": "/upload/:key",
    "title": "Download a image",
    "name": "DownloadFile",
    "version": "0.1.0",
    "group": "Upload",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>Unique key of the file.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>Presigned URL to the File, available for 90 Days.</p>"
          }
        ]
      }
    },
    "filename": "routes/upload.js",
    "groupTitle": "Upload"
  },
  {
    "type": "post",
    "url": "/upload",
    "title": "Upload a new image",
    "name": "UploadFile",
    "version": "0.1.0",
    "group": "Upload",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "imgUpload",
            "description": "<p>File you want to upload.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Required to be multipart/form-data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>The unique image key.</p>"
          }
        ]
      }
    },
    "filename": "routes/upload.js",
    "groupTitle": "Upload"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete a user",
    "name": "DeleteUser",
    "version": "0.1.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Users-ID</p>"
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Get a single user",
    "name": "GetUser",
    "version": "0.1.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Users-ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password from User</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "visited_places",
            "description": "<p>All places visited</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "hosted_places",
            "description": "<p>All places hosted</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>User Status</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created",
            "description": "<p>Creation Date</p>"
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:id/hosted_places",
    "title": "Get all hosted places",
    "name": "GetUserHostedPlaces",
    "version": "0.1.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Users-ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "places",
            "description": "<p>Place objects the user hosted</p>"
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:id/visited_places",
    "title": "Get all visited places",
    "name": "GetUserVisitedPlaces",
    "version": "0.1.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Users-ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "places",
            "description": "<p>Place objects the user visited</p>"
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Get all users",
    "name": "GetUsers",
    "version": "0.1.0",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>List of all user Objects.</p>"
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create a new User",
    "name": "PostUser",
    "version": "0.1.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Required email of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "8..",
            "optional": false,
            "field": "password",
            "description": "<p>Required password of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "Obeject[]",
            "optional": true,
            "field": "visited_places",
            "description": "<p>Optional array with visited places.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "visitedPlace",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "visitedPlace.place_id",
            "description": "<p>ID of the visited place.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "visitedPlace.timestamp",
            "description": "<p>Date when place is visited.</p>"
          },
          {
            "group": "Parameter",
            "type": "Obeject[]",
            "optional": true,
            "field": "hosted_places",
            "description": "<p>Optional array with hosted places.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "active",
            "defaultValue": "true",
            "description": "<p>Optional active status with default true.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"email\":\"example@email.com\",\n    \"password\":\"password123\",\n    \"visited_places\":[\n        {\n        \"place_id\":\"123,\n        \"timestamp\":\"yyyy-MM-dd'T'HH:mm:ss'Z\"\n        }\n    ],\n    \"hosted_places\":[],\n    \"active\":true\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "users",
            "description": "<p>User object that was created.</p>"
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "Modify a user",
    "name": "PutUser",
    "version": "0.1.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Users-ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"email\":\"other@email.com\",\n    \"password\":\"123password\",\n    \"visited_places\":[\n        {\n        \"place_id\":\"321,\n        \"timestamp\":\"yyyy-MM-dd'T'HH:mm:ss'Z\"\n        }\n    ],\n    \"hosted_places\":[],\n    \"avtive\":false\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "users",
            "description": "<p>Modified user object</p>"
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  }
] });
