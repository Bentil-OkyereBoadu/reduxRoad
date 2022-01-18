//initial state
const initialWagonState = {
  supplies: 100,
  distance: 0,
  days: 0,
  cash: 200
}

//setting up reducer function
const reducer = (state = initialWagonState, action) => {
  switch(action.type){
//case gather: add 15 supplies, day + 1, same distance
    case 'gather': return {
      ...state,
        supplies: state.supplies + 15,
        distance: state.distance,
        days: state.days + 1
    }

//case travel: spend 20 supplies, add 10 distance, add 1 day
    case 'travel': 
    //if supplies are in negative return current state
    let newSupplies = { supplies: state.supplies - (20 * action.payload) } ;
    if(newSupplies.supplies < 0){
      return state;
    }
    return {
      ...state,
        supplies: state.supplies - (20 * action.payload),
        distance: state.distance + (10 * action.payload),
        days: action.payload + state.days   
    }
    
//case tippedWagon, supplies-30, days + 1
    case 'tippedWagon': return {
      ...state,
        supplies: state.supplies - 30,
        days: state.days + 1
    }

//case sell: sell 20 supplies, get 5 cash
    case 'sell': return{
      ...state,
      supplies: state.supplies - 20,
      cash: state.cash + 5
    }

//case buy: buy 25 supplies with 15 cash
    case 'buy': return{
      ...state,
      cash: state.cash - 15,
      supplies: state.supplies + 25
    }

//case theft: robbed of half of cash
    case 'theft': return{
      ...state,
      cash: Math.round(state.cash / 2)
    }
    default: return state;
  }
}

let wagon = reducer(undefined, {});
console.log(wagon);

wagon = reducer(wagon, { type:'travel', payload: 1});
console.log(wagon);

wagon = reducer(wagon, { type:'gather'});
console.log(wagon);

wagon = reducer(wagon, { type:'tippedWagon'});
console.log(wagon);

wagon = reducer(wagon, { type:'travel', payload: 3});
console.log(wagon);

wagon = reducer(wagon, { type:'theft'});
console.log(wagon);

wagon = reducer(wagon, { type:'buy'});
console.log(wagon);

wagon = reducer(wagon, { type:'theft'});
console.log(wagon);

wagon = reducer(wagon, { type:'travel', payload: 3});
console.log(wagon);
