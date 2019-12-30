import React from 'react'
import { connect } from 'react-redux'
import { Icon } from 'antd'
import { increase, decrease, getList } from '../actions/about'
interface Props {
    increase: any,
    decrease: any,
    getList: any,
    count: number,
    list: Array<{id: number, name: string}>,
    about: {
        count: number,
        list: Array<{id: number, name: string}>
    }
}
class About extends React.Component<Props, any> {
    // constructor(props: Props){
    //     super(props);
    // }
    increase = ()=>{
        this.props.increase();
    };
    decrease = ()=>{
        this.props.decrease();
    };
    getList = ()=>{
        this.props.getList();
    }
    render() {
        const { count,list } = this.props;
        return (
            <div>
                <h1>about...</h1>
                <div>
                    数量：{ count }
                </div>
                <div>
                    <Icon type="plus" onClick={this.increase}/>
                    <Icon type="minus" onClick={this.decrease}/>
                </div>
                <div>
                    {JSON.stringify(list)}
                </div>
                <div>
                    <span onClick={this.getList}>getList</span>
                </div>
            </div>
        )
    }
}

export default connect(
    (state: any)=>{
        return {
            count: state.about.count,
            list: state.about.list
        }
    },
    {
        increase,
        decrease,
        getList
    }
    )(About);
