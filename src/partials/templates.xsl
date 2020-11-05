<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template name="about-defiant">
	<div class="row-body">
		<div class="panel-left">
			<i class="icon" style="background-image: url(/res/img/def-logo.webp);"></i>
		</div>
		<div class="panel-right">
			<h1><xsl:value-of select="//details/meta[@name='system']/@value" /></h1>
			<h5>Version <span><xsl:value-of select="//details/meta[@name='system']/@version" /></span></h5>

			<div class="details">
				<div class="field-row">
					<div>Author</div>
					<div class="author"><xsl:value-of select="//details/meta[@name='author']/@value" /></div>
				</div>
				<div class="field-row">
					<div>Last updated</div>
					<div class="modified"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="row-foot">
		2019-<span class="year">2021</span> © <xsl:value-of select="//details/meta[@name='company']/@value" /> - All Rights Reserverd
	</div>
</xsl:template>

<xsl:template name="about-app">
	<div class="row-body">
		<div class="panel-left">
			<i class="icon" style="background-image: url(/app/ant/icons/app-icon-finder.png);"></i>
		</div>
		<div class="panel-right">
			<h1>Finder</h1>
			<h5>Version <span>1.0</span></h5>

			<div class="details">
				<div class="field-row">
					<div>Author</div>
					<div class="author">Hakan Bilgin</div>
				</div>
				<div class="field-row">
					<div>Size</div>
					<div class="size">14.2 Kb</div>
				</div>
				<div class="field-row">
					<div>Last updated</div>
					<div class="modified">2020-11-23</div>
				</div>
				<div class="field-row">
					<div>License</div>
					<div class="license" data-click="show-license">MIT</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row-foot">
		2019-<span class="year">2021</span> © Defiant System AB - All Rights Reserverd
	</div>
</xsl:template>

</xsl:stylesheet>
