import { deleteProperty } from './deleteProperty'

describe('[helpers] delete property', () => {
  const target = {
    first: {
      second: {
        third: 'third',
      },
    },
  }

  it('should NOT modify target object', () => {
    const result = deleteProperty(target, ['first'])

    expect(result).toStrictEqual({})
    expect(target).toStrictEqual({
      first: {
        second: {
          third: 'third',
        },
      },
    })
  })

  it('should delete property properties', () => {
    deleteProperty(target, ['first', 'second'])

    expect(target).toStrictEqual({
      first: {},
    })
  })
})
