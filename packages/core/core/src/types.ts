export enum AppType {
  WEB = 'web',
  MOBILE = 'mobile',
  NODE = 'node',
}

export interface ISchemaCommand {
  command: string
  successMessage: string
  priority: number
  shouldRunInProject?: boolean
}

export interface ISchemaAddFile {
  name: string
  source: string
  context?: { [key: string]: string | number | boolean }
}

export interface ISchemaAddProperty {
  path: string[]
  value: string | number | boolean
  file?: string
}

export interface ISchema {
  name: string
  commands: ISchemaCommand[]
  files: {
    add: ISchemaAddFile[]
    remove: string[]
  }
  packageProperties: {
    add: ISchemaAddProperty[]
    remove: string[][]
  }
  dependencies: {
    add: {
      prod: string[]
      dev: string[]
    }
    move: {
      prod: string[] // move to dev dependencies
    }
    remove: string[]
  }
}

export enum CDType {
  NONE = 'none',
  HEROKU = 'heroku',
}

export enum CIType {
  NONE = 'none',
  ACTIONS = 'github_actions',
}

export enum DatabaseType {
  NONE = 'none',
  SQL = 'sql',
}
