const tile = [
    {
        name : 'blank',
        text : '■'
    },{
        name : 'wall',
        text : '■'
    }
];

const object = [
    {
        name : 'error',
        text : '┼'
    },{
        name : 'main-character',
        text : ':)'
    }
];

function new_map(width, height){
    let map = [];
    let low = [];
    for(let i = 0; i < width; i++){
        low.push({tile : 0, object : 0});
    }
    for(let i = 0; i < height; i++){
        map.push(low);
    }
    return JSON.parse(JSON.stringify(map));
}

function fill(map, x, y, dx, dy, tile){
    map.forEach((a, i) => {
        if(y <= i && i <= dy){
            a.fill({tile : tile, object : 0}, x, dx + 1);
        }
    });
    apply(map);
}

function spawn(map, x, y, object){
    map[y][x].object = object;
    apply(map);
}

function move(map, x, y, dx, dy){
    if(map[y + dy][x + dx].tile == 0){
        map[y + dy][x + dx].object = map[y][x].object;
        map[y][x].object = 0;
    }
    apply(map);
}

function apply(maps){
    document.getElementById('objects').innerHTML = ``;
    maps.forEach(a => {
        let low = document.createElement('div');
        low.className = 'objects_low';
        a.forEach(e => {
            let object_div = document.createElement('div');
            if(e.object == 0){
                object_div.className = 'object ' + tile[e.tile].name;
                object_div.innerText = tile[e.tile].text;
            }else{
                object_div.className = 'object ' + object[e.object].name;
                object_div.innerText = object[e.object].text;
            }
            low.append(object_div);
        })
        document.getElementById('objects').append(low);
    })
    map = JSON.parse(JSON.stringify(maps));
}

var map = new_map(25, 25);

fill(map, 0, 0, 24, 24, 1);
fill(map, 1, 1, 23, 23, 0);

spawn(map, 1, 1, 1);

let time = 0;

setInterval(() => {
    time += 1;
    document.getElementById('time').innerText = 'Time ' + '00' + ':' + time / 20;
}, 50);

document.addEventListener("keydown", function(e){
    let local = map;
    let list = [];
    local.forEach((a, i) => {
        a.forEach((e, j) => {
            if(e.object == 1){
                list.push([j, i]);
            }
        })
    })
    if(e.key === 'ArrowDown'){
        list.forEach(a => {
            move(map, a[0], a[1], 0, 1);
        })
    }
    if(e.key === 'ArrowUp'){
        list.forEach(a => {
            move(map, a[0], a[1], 0, -1);
        })
    }
    if(e.key === 'ArrowRight'){
        list.forEach(a => {
            move(map, a[0], a[1], 1, 0);
        })
    }
    if(e.key === 'ArrowLeft'){
        list.forEach(a => {
            move(map, a[0], a[1], -1, 0);
        })
    }
})