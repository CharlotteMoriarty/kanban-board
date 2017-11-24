/*global
button, $ ,$element, i, math, createColumn, $columnDelete, $columnAddCard, Card, prompt, $column, $columnTitle, $columnDelete, $columnCardList, createCard, column, initSortable, $ColumnDelete, randomString, self
*/
/*jslint plusplus: true*/
$(function () {
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ',
            str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.lenght)];
        }
        return str;
    };

    function createColumn(self) {
        var $column = $('<div>').addClass('column'),
            $columnTitle = $('<h2>').addClass('column-title').text(self.name),
            $columnList = $('<ul>').addClass('column-card-list'),
            $columnDelete = $('<button>').addClass('btn-delete').text(' x'),
            $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

        $columnDelete.on('click', function () {
            self.deleteColumn(); //zmiana z remove
        });
        $columnAddCard.on('click', function () {
            self.addCard(new Card(prompt('Card name')));
        });

        $column.append($columnTitle)
            .append($columnList)
            .append($columnAddCard)
            .append($columnDelete);

        return $column;
    };

    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.$element = createColumn(self);
    };

    Column.prototype = {
        addCard: function (card) {
            this.$element.children('ul').append(card.$element);
        },
        deleteColumn: function () {
            this.$element.remove();
        }
    };
    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard();

        function createCard() {
            var $card = $('<li>').addClass('card'),
                $cardDescription = $('<p>').addClass('card-description').text(self.description),
                $cardDelete = $('<button>').addClass('btn-delete').text('x');

            $cardDelete.on('click', function () {
                self.removeCard();
            });

            $card.append($cardDescription)
                .append($cardDelete);
            return $card;
        };
    };

    Card.prototype = {
        removeCard: function () {
            this.$element.remove();

        }
    };

    var board = {
        name: 'Kanban Board',
        addColumn: function (column) {
            this.element.append(column.$element);
            initSortable();
        },
        element: $('#board .column-container')
    }

    function initSortable() {
        $('.column-card-list').sortable({
            placeholder: 'card-placeholder',
            forcePlaceholderSize: true,
            connectWith: '.column-card-list',
            dropOnEmpty: true
        }).disableSelection();
    }

    $('.create-column').on('click', function () {
        var name = prompt('Enter a column name'),
            column = new Column(name);
        board.addColumn(column);
    });
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');


    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);


    var card1 = new Card('New task');
    var card2 = new Card('In progress');
    var card3 = new Card('Finished task');

    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
    doneColumn.addCard(card3);
});
