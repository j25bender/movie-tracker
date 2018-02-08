import * as actions from '../index';

describe('all actions', () => {
  it('should return a type of GET_MOVIES, with a movieData', () => {
    const mockmovieData = { title: 'Coco',
                            id: 354912,
                            poster: 'https://image.tmdb.org/t/p/w500/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg',
                            overview: 'Despite his family’s baffling generations-old ban …ck the real story behind Miguel\'s family history.'
                          }
    const expected = {
      type: 'GET_MOVIES',
      movieData: mockmovieData
    }
    expect(actions.getMovies(mockmovieData)).toEqual(expected)
  })

  it('should return a type of TOGGLE_TODO, with an id', () => {
    const id = 0
    const expected = {
      type: 'TOGGLE_TODO',
      id
    }
    expect(actions.toggleTodo(id)).toEqual(expected)
  })
});