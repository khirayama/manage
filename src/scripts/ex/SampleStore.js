// store: {
//  type: string:'', number:0, boolean:false, datetime:now, date:today
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
// where
// order ASC/DESC
// limit
// connect
// scope - methodの登録
// drop
// valid

// hasMany: sm, hasOne: ss, belongsTo: ms, hasAndBelongsToMany: mm
// dependent - bool
// validate - bool

// - except
// first
// last
// find

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
      {type: 'hasMany', name: 'Post', dependent: true},
      {type: 'hasMany', name: 'Comment', dependent: true}
    ];
  }
}

class Post extends MicroRecord {
  constructor() {
    const migrate = {
      version: 1.0,
      storeName: 'Post',
      schema: {
        title: {type: 'string'},
        body: {type: 'boolean', default: false}
      }
    };
    super(migrate);

    this.association = {
      {type: 'hasOne', name: 'User'}
      {type: 'hasMany', name: 'Comment', dependent: true}
    };
    this.validates = {
      title: {empty: false, required: true},
      body: {empty: false, required: true}
    };
  }
}

class Comment extends MicroRecord {
  constructor() {
    const migrate = {
      version: 1.0,
      storeName: 'Comment',
      schema: {
        comment: {type: 'string'}
      }
    };
    super(migrate);

    this.association = {
      {type: 'belongsTo', name: 'Post', dependent: true}
    };
    this.validates = {
      comment: {empty: false, required: true}
    };
  }
}
