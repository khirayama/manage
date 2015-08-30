// store: {
//  type: string, number, boolean, datetime, date
//  unique: false,
//  default
//  }
//  validates: {
//   empty: true,
//   required: flase,
//   minLength: 0,
//   maxLength: 255,
//   format: reg
//  }

// boolean is not empty
// table nameは複数形 classは単数
// ex) todos / Todo

// static methods
// new
// save
// create - new and save
// update
// destroy
// remove
// find
// where
// first
// last
// order ASC/DESC
// limit
// connect
// scope - methodの登録
// drop
//
// hasMany: sm, hasOne: ss, belongsTo: ms, hasAndBelongsToMany: mm
// dependent: destroy

// validate false

class User extends MicroRecord {
  constructor() {
    const migrate = {
      version: 1.0,
      storeName: 'User',
      schema: {
        name: {type: 'string'},
        birth: {type: 'date'}
      }
    };
    super(migrate);

    this.association = [
      {name: 'Post', type: 'hasMany', dependent: 'destroy'},
      {name: 'Comment', type: 'hasMany', dependent: 'destroy'}
    ];
  }
}

class Post extends MicroRecord {
  constructor() {
    const migrate = {
      version: 1.0,
      storeName: 'Todo',
      schema: {
        title: {type: 'string', default: ''},
        body: {type: 'boolean', default: false}
      }
    };
    super(migrate);

    this.association = {
      hasMany: ['Comment']
    };
    this.validates = {
      text: {empty: false, required: true},
      completed: {empty: false, required: true}
    };
  }
}

class Comment extends MicroRecord {
  constructor() {
    super(migrate);
    this.association = {
      belongsTo: ['Post']
    };
    this.validates = {
      text: {empty: false, required: true},
      completed: {empty: false, required: true}
    };
  }
}
