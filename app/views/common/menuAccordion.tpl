<ul class="simpleMenu uppercase withSubmenu borderedItemsOnHover clearfix">
    {foreach from=$MENU item=m name=menuLoop}
    {if $m.topMenu === true}
        <li class="firstLevelItem">
            <a href="{$m.link}" {if $m.display === $PAGE}class="active"{/if} {if $m.target} target="{$m.target}"{/if} {if $m.rel} rel="{$m.rel}"{/if}">{$m.label}</a>
            {if $m.submenu}
                <ul class="accordionMenu">
                    {foreach from=$m.submenu item=sub name=submenuLoop}
                        <li>
                            {if isset($sub.submenu) && $sub.submenu}
                                <input id="group-{$smarty.foreach.submenuLoop.index}" type="checkbox" hidden/>
                                <label for="group-{$smarty.foreach.submenuLoop.index}"><span class="sprite ico-arrow-right-xs"></span>{$sub.label}</label>
                                <ul class="group-list">
                                    {foreach from=$sub.submenu item=sub2 name=submenu2Loop}
                                        {if $sub2.submenu}
                                            <li>
                                                <input id="sub-group-{$smarty.foreach.submenuLoop.index}" type="checkbox" hidden/>
                                                <label for="sub-group-{$smarty.foreach.submenuLoop.index}"><span class="sprite ico-arrow-right-xs"></span>{$sub2.label}</label>
                                                <ul class="sub-group-list">
                                                    {foreach from=$sub2.submenu item=sub3 name=submenu3Loop}
                                                        <li><a href="{$sub3.link}">{$sub3.label}</a></li>
                                                    {/foreach}
                                                </ul>
                                            </li>
                                        {else}
                                            <li><a href="{$sub2.link}">{$sub2.label}</a></li>
                                        {/if}
                                    {/foreach}
                                </ul>
                            {else}
                                <a href="{$sub.link}"  {if $sub.target} target="{$sub.target}"{/if}>{$sub.label}</a>
                            {/if}
                        </li>
                    {/foreach}
                </ul>
            {/if}
        </li>
    {/if}
    {/foreach}
    <li class="firstLevelItem menuIconsCont">
        <a href="" class="spriteOuterCont burger" onclick="openNav(event)">
            <span>☰</span>
        </a>
    </li>
</ul>
