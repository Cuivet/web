import { Avatar, Image, Typography, Card } from "antd";
const { Meta } = Card;

export default function AvatarSearch(props){
    const {person, icon} = props;
    const styleBig = {
        display: 'flex',
        justifyContent: 'normal',
        alignItems: 'center',
        width: '100%'
    }
    const styleText = {
        marginBottom: '0',
        marginLeft: '5%'
    }
    if(icon != null){
        var flag = <Image src={icon} preview={false} />
    }else{
        flag = person.name[0] + person.lastName[0];
    }
    const styleAvatar= {
        backgroundColor: '#E9C4F2',
        color: '#5B2569'
    }
    return(<>
        <div style={styleBig}>
            <Avatar shape="square" size={80} icon={flag} src={person.photo} style={styleAvatar}></Avatar>
            <Typography.Title level={5} style={styleText} >{person.name + ' ' + person.lastName}</Typography.Title>
        </div>
    </>)
}