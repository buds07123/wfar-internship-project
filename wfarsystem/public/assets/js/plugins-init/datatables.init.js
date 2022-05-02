(function($) {
    "use strict"
    //1
    var table = $('#table').DataTable({
        createdRow: function(row, data, index) {
            $(row).addClass('selected')
        },
        language: {
            paginate: {
                next: '<i class="fa fa-angle-double-right" aria-hidden="true"></i>',
                previous: '<i class="fa fa-angle-double-left" aria-hidden="true"></i>'
            }
        }
    });

    table.on('click', 'tbody tr', function() {
        var $row = table.row(this).nodes().to$();
        var hasClass = $row.hasClass('selected');
        if (hasClass) {
            $row.removeClass('selected')
        } else {
            $row.addClass('selected')
        }
    })

    table.rows().every(function() {
        this.nodes().to$().removeClass('selected')
    });

    //ListDatatableView
    var table = $('#ListDatatableView').DataTable({
        searching: false,
        paging: true,
        select: false,
        lengthChange: false,
        language: {
            paginate: {
                next: '<i class="fa fa-angle-double-right" aria-hidden="true"></i>',
                previous: '<i class="fa fa-angle-double-left" aria-hidden="true"></i>'
            }
        }

    });

    //WFAR TABLE
    var table = $('#wfartable').DataTable({
        language: {
            paginate: {
                next: '<i class="fa fa-angle-double-right" aria-hidden="true"></i>',
                previous: '<i class="fa fa-angle-double-left" aria-hidden="true"></i>'
            }
        }
    });
    $('#wfartable tbody').on('click', 'tr', function() {
        var data = table.row(this).data();
    });
    
    //SUMMARY TABLE
    var table = $('#summary').DataTable({
        orderCellsTop: true,
        initComplete: function() {
            this.api().columns().every(function() {
                var column = this;
                console.log(this.index())
                var select = $('<select><option selected disabled hidden>Filter results</option><option value="">Select All</option></select>')
                    .appendTo($('thead tr:eq(1) th:eq(' + this.index() + ')'))
                    .on('change', function() {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });

                column.data().unique().sort().each(function(d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>')
                });
            });
        },
        language: {
            paginate: {
                next: '<i class="fa fa-angle-double-right" aria-hidden="true"></i>',
                previous: '<i class="fa fa-angle-double-left" aria-hidden="true"></i>'
            }
        }


    });

    $('a.toggle-week').on('click', function(e) {
        e.preventDefault();

        // Get the column API object
        var column = table.column($(this).attr('data-column'));

        // Toggle the visibility
        column.visible(!column.visible());
    });

})(jQuery);