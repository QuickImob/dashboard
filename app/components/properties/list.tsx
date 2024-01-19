import ListItem from './components/listItem';
import './styles.css'

interface PropertiesListProps {
    data:any;
}

export default function PropertiesList({data}: PropertiesListProps) {

    const items = [
        {
            title:'Teste teste teste',
            image:'',
            type:'Teste',
            created_at:'2023-12-21 09:08:58',
            actions:'',
            status:1,
            id:2,
        },
        {
            title:'Teste teste teste',
            image:'',
            type:'Teste',
            created_at:'2023-12-20 11:08:58',
            actions:'',
            status:0,
            id:3,
        },
        {
            title:'Teste teste teste',
            image:'',
            type:'Teste',
            created_at:'2023-12-18 10:08:58',
            actions:'',
            status:1,
            id:4,
        },
        {
            title:'Teste teste teste',
            image:'',
            type:'Teste',
            created_at:'2023-12-17 15:08:58',
            actions:'',
            status:1,
            id:5,
        },
        {
            title:'Teste teste teste',
            image:'',
            type:'Teste',
            created_at:'2023-12-19 14:08:58',
            actions:'',
            status:0,
            id:6,
        },
        {
            title:'Teste teste teste',
            image:'',
            type:'Teste',
            created_at:'2023-12-15 13:08:58',
            actions:'',
            status:1,
            id:7,
        },
    ]

  return (
    <>
        <ListItem data={items}/>
    </>
  )
}