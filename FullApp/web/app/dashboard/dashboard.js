/**
 * Created by Lenovo on 25.03.2017.
 */
    $(document).ready(function(){
        $('.spoiler-body').hide();
        $('.spoiler-title').click(function(){
            $(this).toggleClass('opened').toggleClass('closed').next().slideToggle();
            if($(this).hasClass('opened')) {
                $(this).html('������ �����');
            }
            else {
                $(this).html('�������� �����');
            }
        });
    });
