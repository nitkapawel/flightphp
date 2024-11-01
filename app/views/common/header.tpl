<div id="sidenav" class="sidenav">
	<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
	<ul class="clearfix">
		<li class="firstLevelItem">
			<a href="/">Strona główna</a>
		</li>
		{foreach from=$MENU item=m name=menuLoop}
			<li class="firstLevelItem">
				<a  href="{$m.link}" {if isset($m.rel) && $m.rel} rel="{$m.rel}"{/if}>{$m.label}</a>
				{if $m.submenu}
					<ul>
						{foreach from=$m.submenu item=sub name=submenuLoop}
                            <li class="secondLevelItem">
                                <a href="{$sub.link}">{$sub.label}</a>
                                {if isset($sub.submenu) && $sub.submenu}
                                    <ul>
                                        {foreach from=$sub.submenu item=sub2 name=submenuLoop2}
                                            <li class="secondLevelItem">
                                                <a href="{$sub2.link}">{$sub2.label}</a>
                                            </li>
                                        {/foreach}
                                    </ul>
                                {/if}
                            </li>
						{/foreach}
					</ul>
				{/if}
			</li>
		{/foreach}
	</ul>
</div>

<header class="headerCont" id="headerCont">
	<div class="container clearfix">
		<nav>
			{include file="common/menuAccordion.tpl"}
		</nav>
		
		<a href="/" class="logo">
      		<img alt="" src="/images/logo.svg" height="auto" width="355">
    	</a>
	</div>
</header>


<a href="#top" class="sprite ico-go-to-top" id="icoGoToTop"></a>
