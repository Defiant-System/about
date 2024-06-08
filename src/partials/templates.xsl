<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template name="footer-row">
	<div class="row-foot">
		2019-<xsl:value-of select="substring( //details/meta[@name='system']/@buildDate, 1, 4 )" /> © <xsl:value-of select="//details/meta[@name='company']/@value" /> - All Rights Reserverd
	</div>
</xsl:template>


<xsl:template name="about-karaqu">
	<div class="about-karaqu">
		<div class="row-body">
			<xsl:if test="//Settings/User/@account-type = 2">
				<xsl:attribute name="data-premium">1</xsl:attribute>
			</xsl:if>
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
						<div class="modified"><xsl:value-of select="//details/meta[@name='system']/@buildDate" /></div>
					</div>
					<div class="field-row">
						<div>Licensed to</div>
						<div class="modified"><xsl:value-of select="//Settings/User/@name" /></div>
					</div>
					<div class="field-row">
						<div>Account type</div>
						<div class="modified"><xsl:choose>
							<xsl:when test="//Settings/User/@account-type = 2">Premium</xsl:when>
							<xsl:otherwise>Free</xsl:otherwise>
						</xsl:choose></div>
					</div>
				</div>
			</div>
		</div>
		<xsl:call-template name="footer-row"/>
	</div>
</xsl:template>


<xsl:template name="karaqu-storage">
	<xsl:variable name="baseDir" select="//FileSystem"></xsl:variable>
	<xsl:variable name="used" select="sum($baseDir//i/@size)"></xsl:variable>
	<xsl:variable name="quota">
		<xsl:call-template name="sys:storage-size">
			<xsl:with-param name="bytes" select="$baseDir/@disc" />
		</xsl:call-template>
	</xsl:variable>
	<xsl:variable name="available">
		<xsl:call-template name="sys:file-size">
			<xsl:with-param name="bytes" select="$baseDir/@disc - $used" />
		</xsl:call-template>
	</xsl:variable>

	<div class="cloud-storages">
		<div class="storage">
			<xsl:call-template name="karaqu-storage-item">
				<xsl:with-param name="baseDir" select="//FileSystem"/>
			</xsl:call-template>
			
			<xsl:for-each select="//Settings/Registry/*[@id='fs-cloud-storage']/*">
				<xsl:call-template name="karaqu-storage-item">
					<xsl:with-param name="baseDir" select="//*[@name='Mount']/*[@name=current()/@name]"/>
				</xsl:call-template>
			</xsl:for-each>
		</div>
	</div>
</xsl:template>


<xsl:template name="karaqu-storage-item">
	<xsl:param name="baseDir" select="//FileSystem"/>
	<xsl:variable name="exclude" select="$baseDir/*[@name != 'Mount'][@name != 'Applications'][@name != 'Shared']"/>
	<xsl:variable name="used" select="sum($exclude//i/@size)"></xsl:variable>
	<xsl:variable name="quota">
		<xsl:call-template name="sys:storage-size">
			<xsl:with-param name="bytes" select="$baseDir/@disc" />
		</xsl:call-template>
	</xsl:variable>
	<xsl:variable name="available">
		<xsl:call-template name="sys:file-size">
			<xsl:with-param name="bytes" select="$baseDir/@disc - $used" />
		</xsl:call-template>
	</xsl:variable>
	<xsl:variable name="name">
		<xsl:choose>
			<xsl:when test="@name"><xsl:value-of select="@name" /></xsl:when>
			<xsl:otherwise>Karaqu Cloud Storage</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	<xsl:variable name="icon">
		<xsl:choose>
			<xsl:when test="@icon">icon-<xsl:value-of select="@icon" /></xsl:when>
			<xsl:otherwise>karaqu-cloud-storage</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>

	<xsl:if test="@icon"><hr/></xsl:if>

	<div class="row-body">
		<div class="panel-left">
			<i class="icon">
				<xsl:attribute name="style">
					background-image: url(~/icons/<xsl:value-of select="$icon" />.png);
				</xsl:attribute>
			</i>
		</div>
		<div class="panel-right">
			<h4><xsl:value-of select="$name" /></h4>
			<h5>
				<xsl:value-of select="$available" />
				<xsl:text> available of </xsl:text>
				<xsl:value-of select="$quota" />

				<span class="file-count"><xsl:value-of select="count($exclude//i)" /> files</span>
			</h5>
			<xsl:call-template name="sys:disc-bar">
				<xsl:with-param name="base" select="$baseDir" />
				<xsl:with-param name="exclude" select="$exclude" />
			</xsl:call-template>
		</div>
	</div>
</xsl:template>


<xsl:template name="karaqu-eula">
	<div class="karaqu-eula">
		<div class="row-body">
			<div class="panel-left">
				<i class="icon" style="background-image: url(~/icons/karaqu-logo.png);"></i>
			</div>
			<div class="panel-right">
				<h2>End User License Agreement</h2>
				<p>
					This End-User License Agreement (EULA) is a legal agreement between you (either an individual or a single entity) and Defiant System AB, which includes the computer software and associated media, printed materials, and online or electronic documentation (<i>software product</i>) or Karaqu.
				</p>
				<p>
					By utilizing, viewing, or otherwise using the <i>software product</i>, you agree to be bound by the terms of this EULA.
				</p>
				<p>
					If you do not agree to the terms of this EULA, do not use the <i>software product</i>.
				</p>

				<h3>Terms of use</h3>
				<ul>
					<li>
						You are allowed to use this software as is, through your personal user account. You are not allowed to share your account with others, unless we explicitly grant you the permission to share it. 
						At such time as when your account has been suspended, you must destroy all copies of documentation, associated media, printed materials and copyrighted software source code you might have obtained, either directly or indirectly.
					</li>
					<li>
						You are not allowed to copy any documentation, associated media, printed materials or software source code related to Karaqu.
					</li>
					<li>
						You understand that this is beta quality software. Therefore, we can not be held accountable for any bugs or errors in the source code leading to either loss of data or malfunctioning features.
					</li>
				</ul>
			</div>
		</div>
	</div>
</xsl:template>


<xsl:template name="karaqu-privacy-policy">
	<div class="karaqu-privacy-policy">
		<h2>
			Privacy Policy
			<span>Last updated: November 30, 2021</span>
		</h2>
		<div class="divider over"></div>
		<div class="pp-text"></div>
		<div class="divider under"></div>
		<div class="pp-footer">
			<p>
				If you have any questions about this Privacy Policy, you can contact us:
			</p>
			<p>
				By email: <a href="mailto:mr.hakan.bilgin@gmail.com">mr.hakan.bilgin@gmail.com</a>
			</p>
		</div>
	</div>
</xsl:template>


<xsl:template name="about-app">
	<xsl:variable name="app" />
	<div class="about-app">
		<div class="row-body">
			<div class="panel-left">
				<i class="icon">
					<xsl:attribute name="style">
						background-image: url(/app/<xsl:value-of select="$app/@ns" />/<xsl:value-of select="$app/@id" />/icon.svg);
					</xsl:attribute>
				</i>
			</div>
			<div class="panel-right">
				<h1><xsl:value-of select="$app/@name" /></h1>
				<h5>Version <span><xsl:value-of select="$app/@version" /></span></h5>

				<div class="details">
					<xsl:if test="$app/@author">
						<div class="field-row">
							<div>Author</div>
							<div class="author"><xsl:value-of select="$app/@author" /></div>
						</div>
					</xsl:if>
					<xsl:if test="$app/@ported">
						<div class="field-row">
							<div>Ported by</div>
							<div class="author"><xsl:value-of select="$app/@ported" /></div>
						</div>
					</xsl:if>
					<div class="field-row">
						<div>Size</div>
						<div class="size">
							<xsl:call-template name="sys:file-size">
								<xsl:with-param name="bytes" select="$app/@size" />
							</xsl:call-template>
						</div>
					</div>
					<div class="field-row">
						<div>Last updated</div>
						<div class="modified">
							<span>
								<xsl:value-of select="substring( $app/@isodate, 0, 11)" />
							</span>
							<span>
								<xsl:value-of select="substring( $app/@isodate, 11)" />
							</span>
						</div>
					</div>
					<div class="field-row">
						<div>License</div>
						<div class="license" data-click="show-license">
							<xsl:value-of select="$app/@license" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<xsl:call-template name="footer-row"/>
	</div>
</xsl:template>


<xsl:template name="app-license">
	<div class="app-license">
		<h2></h2>
		<div class="divider over"></div>
		<div class="license-text"></div>
		<div class="divider under"></div>
	</div>
</xsl:template>


<!-- <xsl:template name="app-issues">
	<div class="app-issues">
		<div class="row-body">
			<div class="panel-left">
				
			</div>
			<div class="panel-right">
				Application Issues
			</div>
		</div>
	</div>
</xsl:template> -->


<xsl:template name="app-source-code">
	<xsl:variable name="app" />
	<div class="app-source-code">
		<div class="row-body">
			<div class="panel-left">
				<i class="icon" style="background-image: url(~/icons/icon-github.png);"></i>
			</div>
			<div class="panel-right">
				<h3>Repository</h3>
				<p>
					The source code of <b><xsl:value-of select="//FileGroups/@appName" /></b> 
					is available at Github.<br/>
					<a target="_new">
						<xsl:attribute name="href"><xsl:value-of select="$app//meta[@name='repository']/@value" /></xsl:attribute>
						<xsl:value-of select="$app//meta[@name='repository']/@value" />
					</a>
					
					<br/><br/>
					You can edit and continue its development locally on your 
					computer by using the Karaqu Command Line Interface. To install <b>karaqu-cli</b>, 
					assuming you already installed NodeJS - enter following command in terminal shell;<br/>
				</p>
				<code>npm install karaqu-cli -g</code>
				
				<div class="link-buttons">
					<xsl:attribute name="data-link"><xsl:value-of select="$app//meta[@name='repository']/@value" /></xsl:attribute>
					<div class="btn-link">
						<i class="icon-code"></i>
						<span data-click="open-github" data-arg="code">Code</span>
					</div>

					<div class="btn-link">
						<i class="icon-issue"></i>
						<span data-click="open-github" data-arg="issue">0 Issues</span>
						<span data-click="open-github" data-arg="issue">Report issue</span>
					</div>

					<div class="btn-link">
						<i class="icon-star"></i>
						<span data-click="open-github" data-arg="code">0 Stars</span>
					</div>
				</div>

				<div class="divider simple"></div>

				<h4>Package Contents</h4>
				<h5>
					<xsl:call-template name="sys:file-size">
						<xsl:with-param name="bytes" select="//FileGroups/@total" />
					</xsl:call-template>
					<span class="file-count"><xsl:value-of select="//FileGroups/@files" /> files</span>
				</h5>
				<div class="disc-bar">
					<xsl:for-each select="//FileGroups/i">
						<div>
							<xsl:attribute name="style">
								background: <xsl:value-of select="@color"/>;
								<xsl:if test="@width">width: <xsl:value-of select="@width"/>%;</xsl:if>
							</xsl:attribute>
							<span><xsl:value-of select="@name"/> files</span>
						</div>
					</xsl:for-each>
				</div>
			</div>
		</div>
		<xsl:call-template name="footer-row"/>
	</div>
</xsl:template>


</xsl:stylesheet>
