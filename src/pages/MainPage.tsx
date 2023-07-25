import Cell from "entities/statistic/ui/Cell";

function MainPage() {
    return ( 
        <div>
            <Cell
                fullness={2}
                date={new Date()}
                value={22}
            />
        </div>
     );
}

export default MainPage;